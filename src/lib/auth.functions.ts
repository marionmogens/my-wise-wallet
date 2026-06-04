import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  password: z.string().min(6).max(120),
});

const loginSchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(120),
});

export const signupUser = createServerFn({ method: "POST" })
  .inputValidator((d) => signupSchema.parse(d))
  .handler(async ({ data }) => {
    const bcrypt = (await import("bcryptjs")).default;
    const { query } = await import("./db.server");
    const { getMonetraSession } = await import("./session.server");

    const exists = await query(
      "SELECT id FROM monetra_users WHERE email=$1",
      [data.email.toLowerCase()]
    );
    if (exists.rowCount && exists.rowCount > 0) {
      throw new Error("Email sudah terdaftar");
    }
    const hash = await bcrypt.hash(data.password, 10);
    const ins = await query(
      "INSERT INTO monetra_users (email, name, password_hash) VALUES ($1,$2,$3) RETURNING id, email, name, daily_limit",
      [data.email.toLowerCase(), data.name, hash]
    );
    const user = ins.rows[0];

    // seed default categories
    const defaults: Array<[string, "income" | "expense", string]> = [
      ["Gaji", "income", "#22c55e"],
      ["Bonus", "income", "#10b981"],
      ["Makanan", "expense", "#ef4444"],
      ["Transportasi", "expense", "#f97316"],
      ["Belanja", "expense", "#8b5cf6"],
      ["Hiburan", "expense", "#ec4899"],
      ["Tagihan", "expense", "#0ea5e9"],
    ];
    for (const [name, type, color] of defaults) {
      await query(
        "INSERT INTO monetra_categories (user_id,name,type,color) VALUES ($1,$2,$3,$4)",
        [user.id, name, type, color]
      );
    }

    const session = await getMonetraSession();
    await session.update({ userId: user.id });
    return { id: user.id, email: user.email, name: user.name };
  });

export const loginUser = createServerFn({ method: "POST" })
  .inputValidator((d) => loginSchema.parse(d))
  .handler(async ({ data }) => {
    const bcrypt = (await import("bcryptjs")).default;
    const { query } = await import("./db.server");
    const { getMonetraSession } = await import("./session.server");

    const res = await query(
      "SELECT id, email, name, password_hash FROM monetra_users WHERE email=$1",
      [data.email.toLowerCase()]
    );
    if (!res.rowCount) throw new Error("Email atau password salah");
    const u = res.rows[0];
    const ok = await bcrypt.compare(data.password, u.password_hash);
    if (!ok) throw new Error("Email atau password salah");
    const session = await getMonetraSession();
    await session.update({ userId: u.id });
    return { id: u.id, email: u.email, name: u.name };
  });

export const logoutUser = createServerFn({ method: "POST" }).handler(async () => {
  const { getMonetraSession } = await import("./session.server");
  const session = await getMonetraSession();
  await session.clear();
  return { ok: true };
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const { query } = await import("./db.server");
  const { getMonetraSession } = await import("./session.server");
  const session = await getMonetraSession();
  if (!session.data.userId) return null;
  const res = await query(
    "SELECT id, email, name, daily_limit FROM monetra_users WHERE id=$1",
    [session.data.userId]
  );
  if (!res.rowCount) return null;
  const u = res.rows[0];
  return {
    id: u.id as string,
    email: u.email as string,
    name: u.name as string,
    dailyLimit: Number(u.daily_limit),
  };
});

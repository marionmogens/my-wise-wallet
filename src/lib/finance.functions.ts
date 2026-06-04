import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function requireUserId() {
  const { getMonetraSession } = await import("./session.server");
  const session = await getMonetraSession();
  if (!session.data.userId) throw new Error("Unauthorized");
  return session.data.userId;
}

export const getDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  const userId = await requireUserId();
  const { query } = await import("./db.server");

  const [user, tx, cats] = await Promise.all([
    query(
      "SELECT id, name, email, daily_limit FROM monetra_users WHERE id=$1",
      [userId]
    ),
    query(
      `SELECT t.id, t.type, t.amount, t.note, t.occurred_at, t.category_id,
              c.name AS category_name, c.color AS category_color
       FROM monetra_transactions t
       LEFT JOIN monetra_categories c ON c.id = t.category_id
       WHERE t.user_id=$1
       ORDER BY t.occurred_at DESC, t.created_at DESC
       LIMIT 500`,
      [userId]
    ),
    query(
      "SELECT id, name, type, color FROM monetra_categories WHERE user_id=$1 ORDER BY name",
      [userId]
    ),
  ]);

  const u = user.rows[0];
  return {
    user: {
      id: u.id,
      name: u.name,
      email: u.email,
      dailyLimit: Number(u.daily_limit),
    },
    categories: cats.rows.map((c: any) => ({
      id: c.id as string,
      name: c.name as string,
      type: c.type as "income" | "expense",
      color: c.color as string,
    })),
    transactions: tx.rows.map((t: any) => ({
      id: t.id as string,
      type: t.type as "income" | "expense",
      amount: Number(t.amount),
      note: (t.note as string) || "",
      occurredAt: (t.occurred_at as Date).toISOString().slice(0, 10),
      categoryId: t.category_id as string | null,
      categoryName: (t.category_name as string) || "Tanpa kategori",
      categoryColor: (t.category_color as string) || "#94a3b8",
    })),
  };
});

const txSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive().max(1_000_000_000),
  note: z.string().max(200).optional().default(""),
  categoryId: z.string().uuid().nullable().optional(),
  occurredAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const addTransaction = createServerFn({ method: "POST" })
  .inputValidator((d) => txSchema.parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      `INSERT INTO monetra_transactions (user_id, category_id, type, amount, note, occurred_at)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [userId, data.categoryId || null, data.type, data.amount, data.note || null, data.occurredAt]
    );
    return { ok: true };
  });

export const deleteTransaction = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      "DELETE FROM monetra_transactions WHERE id=$1 AND user_id=$2",
      [data.id, userId]
    );
    return { ok: true };
  });

const catSchema = z.object({
  name: z.string().trim().min(1).max(40),
  type: z.enum(["income", "expense"]),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const addCategory = createServerFn({ method: "POST" })
  .inputValidator((d) => catSchema.parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      "INSERT INTO monetra_categories (user_id,name,type,color) VALUES ($1,$2,$3,$4)",
      [userId, data.name, data.type, data.color]
    );
    return { ok: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      "DELETE FROM monetra_categories WHERE id=$1 AND user_id=$2",
      [data.id, userId]
    );
    return { ok: true };
  });

export const updateDailyLimit = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ amount: z.number().min(0).max(1_000_000_000) }).parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      "UPDATE monetra_users SET daily_limit=$1 WHERE id=$2",
      [data.amount, userId]
    );
    return { ok: true };
  });

export const exportMonthlyCSV = createServerFn({ method: "GET" })
  .inputValidator((d) =>
    z.object({ year: z.number().int().min(2000).max(2100), month: z.number().int().min(1).max(12) }).parse(d)
  )
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    const start = `${data.year}-${String(data.month).padStart(2, "0")}-01`;
    const endMonth = data.month === 12 ? 1 : data.month + 1;
    const endYear = data.month === 12 ? data.year + 1 : data.year;
    const end = `${endYear}-${String(endMonth).padStart(2, "0")}-01`;
    const res = await query(
      `SELECT t.occurred_at, t.type, t.amount, t.note, COALESCE(c.name,'') AS category
       FROM monetra_transactions t
       LEFT JOIN monetra_categories c ON c.id=t.category_id
       WHERE t.user_id=$1 AND t.occurred_at >= $2 AND t.occurred_at < $3
       ORDER BY t.occurred_at`,
      [userId, start, end]
    );
    const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
    const header = "Tanggal,Tipe,Kategori,Jumlah,Catatan";
    const lines = res.rows.map((r: any) =>
      [
        (r.occurred_at as Date).toISOString().slice(0, 10),
        r.type,
        esc(r.category),
        Number(r.amount).toFixed(2),
        esc(r.note || ""),
      ].join(",")
    );
    return { csv: [header, ...lines].join("\n") };
  });

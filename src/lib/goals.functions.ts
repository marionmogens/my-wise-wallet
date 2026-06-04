import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function requireUserId() {
  const { getMonetraSession } = await import("./session.server");
  const session = await getMonetraSession();
  if (!session.data.userId) throw new Error("Unauthorized");
  return session.data.userId;
}

export const getGoals = createServerFn({ method: "GET" }).handler(async () => {
  const userId = await requireUserId();
  const { query } = await import("./db.server");
  const res = await query(
    `SELECT id, name, target_amount, saved_amount, color, target_date, created_at
     FROM monetra_savings_goals
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return {
    goals: res.rows.map((g: any) => ({
      id: g.id as string,
      name: g.name as string,
      targetAmount: Number(g.target_amount),
      savedAmount: Number(g.saved_amount),
      color: g.color as string,
      targetDate: g.target_date ? (g.target_date as Date).toISOString().slice(0, 10) : null,
    })),
  };
});

const addSchema = z.object({
  name: z.string().trim().min(1).max(60),
  targetAmount: z.number().positive().max(1_000_000_000),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
});

export const addGoal = createServerFn({ method: "POST" })
  .inputValidator((d) => addSchema.parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      `INSERT INTO monetra_savings_goals (user_id, name, target_amount, color, target_date)
       VALUES ($1,$2,$3,$4,$5)`,
      [userId, data.name, data.targetAmount, data.color, data.targetDate || null]
    );
    return { ok: true };
  });

export const contributeGoal = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: z.string().uuid(),
        amount: z.number().max(1_000_000_000),
      })
      .parse(d)
  )
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      `UPDATE monetra_savings_goals
       SET saved_amount = GREATEST(0, saved_amount + $1)
       WHERE id = $2 AND user_id = $3`,
      [data.amount, data.id, userId]
    );
    return { ok: true };
  });

export const deleteGoal = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const { query } = await import("./db.server");
    await query(
      "DELETE FROM monetra_savings_goals WHERE id=$1 AND user_id=$2",
      [data.id, userId]
    );
    return { ok: true };
  });

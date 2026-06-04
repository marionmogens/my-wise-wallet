import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const msgSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .min(1)
    .max(30),
});

export const chatFinance = createServerFn({ method: "POST" })
  .inputValidator((d) => msgSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI belum dikonfigurasi");

    const { getMonetraSession } = await import("./session.server");
    const session = await getMonetraSession();
    let context = "";
    if (session.data.userId) {
      const { query } = await import("./db.server");
      const summary = await query(
        `SELECT
           COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE 0 END),0) AS income,
           COALESCE(SUM(CASE WHEN type='expense' THEN amount ELSE 0 END),0) AS expense
         FROM monetra_transactions
         WHERE user_id=$1 AND occurred_at >= date_trunc('month', CURRENT_DATE)`,
        [session.data.userId]
      );
      const u = await query(
        "SELECT daily_limit FROM monetra_users WHERE id=$1",
        [session.data.userId]
      );
      const s = summary.rows[0];
      context = `\nData keuangan pengguna bulan ini: Pemasukan Rp${Number(s.income).toLocaleString("id-ID")}, Pengeluaran Rp${Number(s.expense).toLocaleString("id-ID")}. Limit harian: Rp${Number(u.rows[0]?.daily_limit || 0).toLocaleString("id-ID")}.`;
    }

    const system = `Kamu adalah Monetra AI, asisten keuangan pribadi berbahasa Indonesia. Berikan saran finansial yang singkat, praktis, dan ramah. Gunakan poin-poin bila perlu.${context}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Terlalu banyak permintaan, coba lagi sebentar.");
      if (res.status === 402) throw new Error("Kuota AI habis. Tambahkan kredit di workspace.");
      throw new Error("AI gagal merespons");
    }
    const json = await res.json();
    const reply = json.choices?.[0]?.message?.content || "Maaf, tidak ada respons.";
    return { reply };
  });

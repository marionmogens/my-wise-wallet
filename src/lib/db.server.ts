import { Client } from "pg";

const DATABASE_URL = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("A database connection string is required");
}

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number }> {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows as T[], rowCount: res.rowCount ?? 0 };
  } finally {
    await client.end().catch(() => {});
  }
}

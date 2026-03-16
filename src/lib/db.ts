import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy — only throws at query time, not at module load
// This prevents Vercel from silently returning 404 on missing env var
function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof getDb> | null = null;

export function getDbClient() {
  if (!_db) _db = getDb();
  return _db;
}

// Named export for convenience — same as before
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    return getDbClient()[prop as keyof ReturnType<typeof getDb>];
  },
});

export type DB = ReturnType<typeof getDb>;

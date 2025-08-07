import Database from "better-sqlite3"
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema"

export function dbSqlite() {
  const sqlite = new Database(process.env.DATABASE_URL)
  return drizzleSqlite(sqlite, { schema })
}

export type DBType = ReturnType<typeof dbSqlite>

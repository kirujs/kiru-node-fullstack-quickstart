import { drizzle as drizzleD1 } from "drizzle-orm/d1"
import type { D1Database } from "@cloudflare/workers-types"
import * as schema from "./schema"

export function dbD1(d1: D1Database) {
  return drizzleD1(d1, { schema })
}

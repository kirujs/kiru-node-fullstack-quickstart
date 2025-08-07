import type { Get, UniversalMiddleware } from "@universal-middleware/core"
import { dbSqlite } from "$/database/drizzle/db"

// Add `db` to the Context
export const dbMiddleware: Get<[], UniversalMiddleware> =
  () => async (_request, context, _runtime) => {
    const db = dbSqlite()

    return {
      ...context,
      db: db,
    }
  }

import type { Get, UniversalMiddleware } from "@universal-middleware/core"
import { dbD1 } from "$/database/drizzle/db"
import { getDbFromRuntime } from "$/database/d1/helpers"

// Add `db` to the Context
export const dbMiddleware: Get<[], UniversalMiddleware> =
  () => async (_request, context, _runtime) => {
    const db = dbD1(await getDbFromRuntime(_runtime))

    return {
      ...context,
      db: db,
    }
  }

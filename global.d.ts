import { dbSqlite } from "$/database/drizzle/db"
import { D1Database } from "@cloudflare/workers-types"
import { betterAuth, Session, User } from "better-auth"

type SessionContext = { session: Session; user: User } | null

declare global {
  namespace Vike {
    interface PageContext {
      abortReason?: string
      abortStatusCode?: number
      is404?: boolean
      urlPathname: string

      config: {
        title: string | ((ctx: PageContext) => string)
        Page: Kiru.FC
        Layout: Kiru.FC[]
      }

      routeParams: Record<string, string>
      data: Record<string, unknown>
      session: SessionContext
    }

    interface PageContextServer {
      db: DBType
      betterAuth: ReturnType<typeof betterAuth>
    }
  }
}

declare module "telefunc" {
  namespace Telefunc {
    interface Context {
      db: DBType
      betterAuth: ReturnType<typeof betterAuth>
      session: SessionContext
    }
  }
}

declare global {
  namespace Universal {
    interface Context {
      db: DBType
      betterAuth: ReturnType<typeof betterAuth>
      session: SessionContext
    }
  }
}
export {}

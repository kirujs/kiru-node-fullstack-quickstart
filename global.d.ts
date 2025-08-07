import { dbSqlite } from "$/database/drizzle/db"
import { D1Database } from "@cloudflare/workers-types"
import { betterAuth, Session, User } from "better-auth"

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
      session: { session: Session; user: User } | null
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
      session: null | {
        session: Session
        user: User
      }
    }
  }
}

declare global {
  namespace Universal {
    interface Context {
      db: DBType
      betterAuth: ReturnType<typeof betterAuth>
      session: null | {
        session: Session
        user: User
      }
    }
  }
}
export {}

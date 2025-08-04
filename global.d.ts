import { D1Database } from "@cloudflare/workers-types"
import { betterAuth, Session, User } from "better-auth"
import { dbD1 } from "./database/drizzle/db"

declare global {
  namespace Vike {
    interface PageContext {
      abortReason?: string
      abortStatusCode?: number
      is404?: boolean
      urlPathname: string

      config: {
        title: string | ((ctx: PageContext) => string)
        Page: Kaioken.FC
        Layout: Kaioken.FC[]
      }

      routeParams: Record<string, string>
      data: Record<string, unknown>
    }
  }
}

declare module "telefunc" {
  namespace Telefunc {
    interface Context {
      db: ReturnType<typeof dbD1>
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
      db: ReturnType<typeof dbD1>
      betterAuth: ReturnType<typeof betterAuth>
      session: null | {
        session: Session
        user: User
      }
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof dbD1>
      session: null | {
        session: Session
        user: User
      }
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      env: Env
    }
  }
}

// Cloudflare typings
interface Env {
  DB: D1Database
}

export {}

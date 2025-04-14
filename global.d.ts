import { User } from "lucia"
import { dbSqlite } from "./database/drizzle/db"

//https://vike.dev/pageContext#custom

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
      db: ReturnType<typeof dbSqlite>
      user?: User
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      user?: User
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof dbSqlite>
    }
  }
}

export {}

import { Get, UniversalMiddleware } from "@universal-middleware/core"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import * as authSchema from "$/database/drizzle/schema/auth"
import { env } from "../env"

/**
 * useful links
 * https://www.better-auth.com/docs/installation
 * https://www.better-auth.com/docs/concepts/session-management
 */

/** */
export const betterAuthDbMiddleware: Get<[], UniversalMiddleware> =
  () => async (_, context) => {
    const auth = betterAuth({
      baseURL: env.BASE_URL,
      secret: env.AUTH_SECRET,
      database: drizzleAdapter(context.db, {
        provider: "sqlite", // or "mysql", "pg"
        schema: authSchema,
      }),
      session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
      },
      emailAndPassword: {
        enabled: true,
      },
      socialProviders: {
        github: {
          clientId: env.GITHUB_CLIENT_ID!,
          clientSecret: env.GITHUB_CLIENT_SECRET!,
          redirectUri: `${env.BASE_URL}/api/auth/callback/github`, // this should match the redirectUri in the github app
        },
      },
    })
    return {
      ...context,
      betterAuth: auth,
    }
  }

export const betterAuthHandlers =
  () => async (req: Request, context: Universal.Context) => {
    return context.betterAuth.handler(req)
  }

export const betterAuthSessionMiddleware: Get<[], UniversalMiddleware> =
  () => async (req, context) => {
    const session = await context.betterAuth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: req.headers, // pass the headers
    })

    if (!session) {
      return {
        ...context,
        session: null,
      }
    } else {
      return {
        ...context,
        session,
      }
    }
  }

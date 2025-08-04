import "dotenv/config"
import { Hono } from "hono"
import {
  betterAuthDbMiddleware,
  betterAuthSessionMiddleware,
  betterAuthHandlers,
} from "./middleware/better-auth-handlers"
import { createHandler, createMiddleware } from "@universal-middleware/hono"
import { vikeHandler } from "./middleware/vike-handler"
import { telefuncHandler } from "./middleware/telefunc-handler"
import { dbMiddleware } from "./middleware/db-middleware"

const app = new Hono()

app.use(createMiddleware(dbMiddleware)())

app.use(createMiddleware(betterAuthDbMiddleware)())

app.use(createMiddleware(betterAuthSessionMiddleware)())

/**
 * Auth.js route
 * @link {@see https://authjs.dev/getting-started/installation}
 **/
//app.use("/api/auth/**", createHandler(authjsHandler)())
app.on(["POST", "GET"], "/api/auth/**", createHandler(betterAuthHandlers)())

app.post("/_telefunc", createHandler(telefuncHandler)())

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)())

export default app

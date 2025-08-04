import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/database/drizzle/schema/*",
  out: "./src/database/migrations",
})

import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { user } from "./auth"

export const todoTable = sqliteTable("todos", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: text("text", { length: 50 }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

// You can then infer the types for selecting and inserting
export type TodoItem = typeof todoTable.$inferSelect
export type TodoInsert = typeof todoTable.$inferInsert

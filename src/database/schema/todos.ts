import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { userTable } from "./users"

// Example of defining a schema in Drizzle ORM:
export const todoTable = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  text: text("text", { length: 50 }).notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
})

// You can then infer the types for selecting and inserting
export type TodoItem = typeof todoTable.$inferSelect
export type TodoInsert = typeof todoTable.$inferInsert

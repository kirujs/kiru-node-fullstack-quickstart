import { todoTable } from "../schema/todos"
import type { dbSqlite } from "../"
import { eq } from "drizzle-orm/sqlite-core/expressions"

export function insertTodo(db: ReturnType<typeof dbSqlite>, text: string) {
  return db.insert(todoTable).values({ text })
}

export function getAllTodos(db: ReturnType<typeof dbSqlite>) {
  return db.select().from(todoTable).all()
}

export function updateTodo(
  db: ReturnType<typeof dbSqlite>,
  id: number,
  text: string
) {
  return db.update(todoTable).set({ text }).where(eq(todoTable.id, id))
}

export function deleteTodo(db: ReturnType<typeof dbSqlite>, id: number) {
  return db.delete(todoTable).where(eq(todoTable.id, id))
}

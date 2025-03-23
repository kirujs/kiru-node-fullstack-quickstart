import { TodoItem, todoTable } from "../schema/todos"
import type { dbSqlite } from "../"
import { and, eq } from "drizzle-orm/sqlite-core/expressions"

export function insertTodo(
  db: ReturnType<typeof dbSqlite>,
  userId: string,
  text: string
) {
  return db.insert(todoTable).values({ userId, text }).returning()
}

export function getAllTodos(db: ReturnType<typeof dbSqlite>, userId: string) {
  return db.select().from(todoTable).where(eq(todoTable.userId, userId)).all()
}

export function updateTodo(
  db: ReturnType<typeof dbSqlite>,
  userId: string,
  { id, text, completed }: TodoItem
) {
  return db
    .update(todoTable)
    .set({ text, completed })
    .where(and(eq(todoTable.userId, userId), eq(todoTable.id, id)))
    .returning()
}

export function deleteTodo(
  db: ReturnType<typeof dbSqlite>,
  userId: string,
  id: number
) {
  return db
    .delete(todoTable)
    .where(and(eq(todoTable.userId, userId), eq(todoTable.id, id)))
    .returning()
}

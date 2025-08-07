import { and, eq } from "drizzle-orm"
import { TodoItem, todoTable } from "../schema/todos"
import type { DBType } from "../db"

export function insertTodo(db: DBType, userId: string, text: string) {
  return db.insert(todoTable).values([{ text, userId }]).returning()
}

export async function getAllTodos(db: DBType, userId: string) {
  return db.select().from(todoTable).where(eq(todoTable.userId, userId))
}

export function updateTodo(db: DBType, userId: string, { id, text }: TodoItem) {
  return db
    .update(todoTable)
    .set({ text })
    .where(and(eq(todoTable.userId, userId), eq(todoTable.id, id)))
    .returning()
}

export function deleteTodo(db: DBType, userId: string, id: string) {
  return db
    .delete(todoTable)
    .where(and(eq(todoTable.id, id)))
    .returning()
}

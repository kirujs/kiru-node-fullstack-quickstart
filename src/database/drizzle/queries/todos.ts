import { and, eq } from "drizzle-orm"
import { TodoItem, todoTable } from "../schema/todos"
import { dbD1 } from "../db"

export function insertTodo(
  db: ReturnType<typeof dbD1>,
  userId: string,
  text: string
) {
  return db.insert(todoTable).values([{ text, userId }]).returning()
}

export async function getAllTodos(db: ReturnType<typeof dbD1>, userId: string) {
  return db.select().from(todoTable).where(eq(todoTable.userId, userId))
}

export function updateTodo(
  db: ReturnType<typeof dbD1>,
  userId: string,
  { id, text }: TodoItem
) {
  return db
    .update(todoTable)
    .set({ text })
    .where(and(eq(todoTable.userId, userId), eq(todoTable.id, id)))
    .returning()
}

export function deleteTodo(
  db: ReturnType<typeof dbD1>,
  userId: string,
  id: string
) {
  return db
    .delete(todoTable)
    .where(and(eq(todoTable.id, id)))
    .returning()
}

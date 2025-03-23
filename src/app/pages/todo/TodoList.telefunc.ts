// We use Telefunc (https://telefunc.com) for data mutations. Being able to use Telefunc for fetching initial data is work-in-progress (https://vike.dev/data-fetching#tools).

import type { dbSqlite } from "$/database"
import type { User } from "lucia"
import * as drizzleQueries from "$/database/queries/todos"
import { Abort, getContext } from "telefunc"
import { TodoItem } from "$/database/schema/todos"

function getCRUDContext(): { db: ReturnType<typeof dbSqlite>; user: User } {
  const { db, user } = getContext()
  if (!user) throw Abort({ notLoggedIn: true })
  return { db, user }
}

export async function onCreateTodo({ text }: { text: string }) {
  const { db, user } = getCRUDContext()
  return await drizzleQueries.insertTodo(db, user.id, text)
}

export async function onDeleteTodo({ id }: { id: number }) {
  const { db, user } = getCRUDContext()
  return await drizzleQueries.deleteTodo(db, user.id, id)
}

export async function onUpdateTodo(todo: TodoItem) {
  const { db, user } = getCRUDContext()
  return await drizzleQueries.updateTodo(db, user.id, todo)
}

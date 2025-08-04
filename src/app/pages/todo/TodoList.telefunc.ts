// We use Telefunc (https://telefunc.com) for data mutations. Being able to use Telefunc for fetching initial data is work-in-progress (https://vike.dev/data-fetching#tools).

import type { User } from "better-auth"
import { Abort, getContext } from "telefunc"
import type { dbD1 } from "$/database/drizzle/db"
import * as drizzleQueries from "$/database/drizzle/queries/todos"
import { TodoItem } from "$/database/drizzle/schema/todos"

function getCRUDContext(): { db: ReturnType<typeof dbD1>; user: User } {
  const { db, session } = getContext()
  if (!session) throw Abort({ notLoggedIn: true })
  return { db, user: session.user }
}

export function onCreateTodo({ text }: { text: string }) {
  const { db, user } = getCRUDContext()
  return drizzleQueries.insertTodo(db, user.id, text)
}

export async function onDeleteTodo({ id }: { id: string }) {
  const { db, user } = getCRUDContext()
  return await drizzleQueries.deleteTodo(db, user.id, id)
}

export async function onUpdateTodo(todo: TodoItem) {
  const { db, user } = getCRUDContext()
  return await drizzleQueries.updateTodo(db, user.id, todo)
}

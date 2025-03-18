// We use Telefunc (https://telefunc.com) for data mutations. Being able to use Telefunc for fetching initial data is work-in-progress (https://vike.dev/data-fetching#tools).

import * as drizzleQueries from "$/database/queries/todos"
import { getContext } from "telefunc"

export async function onCreateTodo({ text }: { text: string }) {
  const context = getContext()
  return await drizzleQueries.insertTodo(context.db, text)
}

export async function onDeleteTodo({ id }: { id: number }) {
  const context = getContext()
  return await drizzleQueries.deleteTodo(context.db, id)
}

export async function onUpdateTodo({ id, text }: { id: number; text: string }) {
  const context = getContext()
  return await drizzleQueries.updateTodo(context.db, id, text)
}

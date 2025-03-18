// https://vike.dev/data
import { TodoItem } from "$/database/schema/todos"
import * as drizzleQueries from "$/database/queries/todos"
import type { PageContextServer } from "vike/types"

export type Data = {
  todos: TodoItem[]
}

export default async function data(
  _pageContext: PageContextServer
): Promise<Data> {
  const todos = await drizzleQueries.getAllTodos(_pageContext.db)
  return { todos }
}

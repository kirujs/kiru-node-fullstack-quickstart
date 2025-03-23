// https://vike.dev/data
import { TodoItem } from "$/database/schema/todos"
import * as drizzleQueries from "$/database/queries/todos"
import type { PageContext } from "vike/types"

export type Data = {
  todos: TodoItem[]
}

export default async function data(pageContext: PageContext): Promise<Data> {
  const todos = await drizzleQueries.getAllTodos(
    pageContext.db,
    // this is safe, our +guard makes sure the user is logged in.
    pageContext.user!.id
  )
  return { todos }
}

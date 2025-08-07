// https://vike.dev/data
import type { PageContextServer } from "vike/types"
import type { TodoItem } from "$/database/drizzle/schema/todos"
import * as drizzleQueries from "$/database/drizzle/queries/todos"

export type Data = {
  todos: TodoItem[]
}

export default async function data(
  pageContext: PageContextServer
): Promise<Data> {
  const todos = await drizzleQueries.getAllTodos(
    pageContext.db,
    // this is safe, our +guard makes sure the user is logged in.
    pageContext.session!.user.id
  )
  return { todos }
}

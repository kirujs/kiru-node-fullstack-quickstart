import type { Data } from "./+data"
import { TodoList } from "./TodoList.js"
import { useData } from "$/app/context/pageContext"

export default function Page() {
  const data = useData<Data>()
  return (
    <>
      <h1>To-do List</h1>
      <TodoList initialTodoItems={data.todos} />
    </>
  )
}

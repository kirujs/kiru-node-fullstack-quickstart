import { useCallback, useModel, useSignal, useState } from "kaioken"
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from "./TodoList.telefunc"
import type { TodoItem } from "$/database/schema/todos"

let pendingCount = 0
export function TodoList({
  initialTodoItems,
}: {
  initialTodoItems: TodoItem[]
}) {
  const todoItems = useSignal<TodoItem[]>(initialTodoItems)
  const newTodo = useSignal("")

  const removeItem = useCallback(async (todoItem: TodoItem) => {
    try {
      const [res] = await onDeleteTodo(todoItem)
      if (!res) throw new Error("Failed to delete todo")
      todoItems.value = todoItems.value.filter(
        (item) => item.id !== todoItem.id
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  const saveItem = useCallback(async (todoItem: TodoItem) => {
    try {
      const [res] = await onUpdateTodo(todoItem)
      if (!res) throw new Error("Failed to update todo")
      todoItems.value = todoItems.value.map((item) =>
        item.id === todoItem.id ? todoItem : item
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  const addItem = useCallback(async (ev: Event) => {
    ev.preventDefault()
    // Optimistic UI update
    const tempId = -1 - --pendingCount
    todoItems.value.push({
      text: newTodo.value,
      id: tempId,
      userId: "__TEMP__",
      completed: false,
    })
    try {
      const [res] = await onCreateTodo({ text: newTodo.value })
      if (!res) throw new Error("Failed to create todo")
      todoItems.value = todoItems.value.map((item) =>
        item.id === tempId ? res : item
      )
      newTodo.value = ""
    } catch (e) {
      console.error(e)
      // rollback
      todoItems.value = todoItems.value.filter((item) => item.id !== tempId)
    } finally {
      pendingCount++
    }
  }, [])

  return (
    <>
      <ul className="flex flex-col gap-1 mb-1">
        {todoItems.value.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItemView {...{ todoItem, removeItem, saveItem }} />
          </li>
        ))}
      </ul>
      <div>
        <form onsubmit={addItem}>
          <input
            type="text"
            oninput={(ev) => (newTodo.value = ev.target.value)}
            value={newTodo}
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto p-2 mr-1 mb-1"
            }
          />
          <button
            type="submit"
            className={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-2"
            }
          >
            Add to-do
          </button>
        </form>
      </div>
    </>
  )
}

const TodoItemView: Kaioken.FC<{
  todoItem: TodoItem
  removeItem: (todoItem: TodoItem) => Promise<void>
  saveItem: (todoItem: TodoItem) => Promise<void>
}> = ({ todoItem, removeItem, saveItem }) => {
  const [textRef, text] = useModel<HTMLInputElement>(todoItem.text)
  const [checkedRef, checked] = useModel<HTMLInputElement, boolean>(
    todoItem.completed
  )
  const [loading, setLoading] = useState(false)

  const handleDelete = useCallback(async () => {
    setLoading(true)
    try {
      await removeItem(todoItem)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [])

  const handleSave = useCallback(async () => {
    setLoading(true)
    try {
      await saveItem({ ...todoItem, text })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [text])

  return (
    <div className={"flex gap-1"}>
      <input ref={textRef} value={text} />
      <input type="checkbox" ref={checkedRef} checked={checked} />

      <div className="flex gap-1">
        <button
          onclick={handleDelete}
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
          disabled={loading}
        >
          delete
        </button>
        <button
          onclick={handleSave}
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded"
          disabled={todoItem.text === text || loading}
        >
          save
        </button>
      </div>
    </div>
  )
}

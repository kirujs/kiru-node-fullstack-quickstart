import { useCallback, useComputed, useSignal } from "kiru"
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from "./TodoList.telefunc"
import type { TodoItem } from "$/database/drizzle/schema/todos"

type OptimisticTodoItem = TodoItem & { optimistic?: boolean }

export function TodoList({
  initialTodoItems,
}: {
  initialTodoItems: TodoItem[]
}) {
  const todoItems = useSignal<OptimisticTodoItem[]>(initialTodoItems)
  const newTodo = useSignal("")

  const removeItem = useCallback(async (todoItem: TodoItem) => {
    try {
      todoItems.value = todoItems.value.filter(
        (item) => item.id !== todoItem.id
      )
      const [res] = await onDeleteTodo(todoItem)
      if (!res) throw new Error("Failed to delete todo")
      todoItems.value = todoItems.value.filter(
        (item) => item.id !== todoItem.id
      )
    } catch (error) {
      console.error(error)
      todoItems.value = todoItems.value.map((item) =>
        item.id === todoItem.id ? todoItem : item
      )
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
    const tempId = crypto.randomUUID()
    todoItems.value = [
      ...todoItems.value,
      {
        text: newTodo.value,
        id: tempId,
        userId: "__TEMP__",
        optimistic: true,
      },
    ]
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

const TodoItemView: Kiru.FC<{
  todoItem: OptimisticTodoItem
  removeItem: (todoItem: TodoItem) => Promise<void>
  saveItem: (todoItem: TodoItem) => Promise<void>
}> = ({ todoItem, removeItem, saveItem }) => {
  const itemText = useSignal(todoItem.text)
  const isActionInProgress = useSignal(false)

  const handleDelete = useCallback(async () => {
    isActionInProgress.value = true
    try {
      await removeItem(todoItem)
    } catch (error) {
      console.error(error)
    } finally {
      isActionInProgress.value = false
    }
  }, [])

  const handleSave = useCallback(async () => {
    isActionInProgress.value = true
    try {
      await saveItem({ ...todoItem, text: itemText.peek() })
    } catch (error) {
      console.error(error)
    } finally {
      isActionInProgress.value = false
    }
  }, [])

  const saveDisabled = useComputed(() => {
    const inProgress = isActionInProgress.value
    const text = itemText.value
    return todoItem.text === text || inProgress
  })

  return (
    <div className={`flex gap-1 ${todoItem.optimistic ? "opacity-50" : ""}`}>
      <input bind:value={itemText} disabled={isActionInProgress} />

      <div className="flex gap-1">
        <button
          onclick={handleDelete}
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
          disabled={isActionInProgress}
        >
          delete
        </button>
        <button
          onclick={handleSave}
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded"
          disabled={saveDisabled}
        >
          save
        </button>
      </div>
    </div>
  )
}

import { useState } from "kaioken"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button
      type="button"
      className={"btn"}
      onclick={() => setCount((count) => count + 1)}
    >
      Counter {count}
    </button>
  )
}

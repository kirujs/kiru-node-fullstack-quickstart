import { signal } from "kiru"
import { Button } from "$/app/components/Button"

export function Counter() {
  const count = signal(0)

  return () => (
    <Button type="button" onclick={() => count.value++}>
      Click me! ({count})
    </Button>
  )
}

import { type ElementProps, unwrap } from "kiru"
import { cls } from "../utils/tw-merge"

export function Input({ className, ...props }: ElementProps<"input">) {
  return (
    <input
      className={cls(
        unwrap(className),
        "rounded-lg px-2 py-1 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      )}
      {...props}
    />
  )
}

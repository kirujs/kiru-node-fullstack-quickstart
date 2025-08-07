import { type ElementProps, unwrap } from "kiru"
import { cls } from "../utils/tw-merge"

type ButtonProps = ElementProps<"button"> & {
  variant?: "primary" | "secondary"
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cls(
        unwrap(className),
        "flex items-center justify-center gap-2 rounded-lg px-4 py-2 disabled:opacity-50",
        variant === "primary" && "bg-blue-700 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-gray-700 text-white hover:bg-gray-600"
      )}
      {...props}
    />
  )
}

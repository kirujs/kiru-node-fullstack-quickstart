import { type ElementProps } from "kiru"

export function Loader(props: ElementProps<"div">) {
  return (
    <div className="flex items-center justify-center" {...props}>
      <div className="w-4 h-4 border-2 border-white/10 border-t-white rounded-full animate-spin" />
    </div>
  )
}

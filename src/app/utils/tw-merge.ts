import { type ClassNameValue, twMerge } from "tailwind-merge"

export function cls(...classes: ClassNameValue[]) {
  return twMerge(...classes)
}

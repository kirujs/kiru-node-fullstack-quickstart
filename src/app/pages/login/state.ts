import { signal } from "kiru"

export const formMode = signal<"login" | "signup">("login")
export const formState = {
  email: signal(""),
  password: signal(""),
  name: signal(""),
  submitting: signal(false),
  error: signal<string | null>(null),
}

export const getFormValues = () => {
  return {
    name: formState.name.peek(),
    email: formState.email.peek(),
    password: formState.password.peek(),
  }
}

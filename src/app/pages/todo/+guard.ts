import { redirect } from "vike/abort"
import { GuardSync } from "vike/types"

export const guard: GuardSync = async (pageContext) => {
  if (!pageContext.session) {
    throw redirect("/login")
  }
}

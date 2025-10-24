import { redirect } from "vike/abort"
import { PageContextServer } from "vike/types"

export const guard = (pageContext: PageContextServer) => {
  if (!pageContext.session) {
    throw redirect("/login")
  }
}

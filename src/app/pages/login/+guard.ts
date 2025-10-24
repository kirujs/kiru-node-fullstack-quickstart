// https://vike.dev/guard
import { redirect } from "vike/abort"
import type { PageContextServer } from "vike/types"

export const guard = (pageContext: PageContextServer) => {
  if (pageContext.session) {
    throw redirect("/")
  }
}

// https://vike.dev/onRenderClient
import type { PageContextClient } from "vike/types"
import type { AppContext } from "kiru"
import { hydrate } from "kiru/ssr/client"
import { getTitle } from "./utils"
import { App } from "./App"

let appContext: AppContext | undefined

export const onRenderClient = (pageContext: PageContextClient) => {
  const container = document.getElementById("page-root")!

  if (pageContext.isHydration || !appContext) {
    appContext = hydrate(<App pageContext={pageContext} />, container)
    return
  }

  document.title = getTitle(pageContext)
  appContext.render(<App pageContext={pageContext} />)
}

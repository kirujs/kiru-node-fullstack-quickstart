// https://vike.dev/onRenderClient
import type { PageContextClient } from "vike/types"
import { signal, type AppHandle } from "kiru"
import { hydrate } from "kiru/ssr/client"
import { getTitle } from "./utils"
import { App } from "./App"

let appHandle: AppHandle | undefined
const pathname = signal<string>(null!)
export const onRenderClient = (pageContext: PageContextClient) => {
  const container = document.getElementById("page-root")!
  const ctx = { ...pageContext, $pathname: pathname }

  if (ctx.isHydration || !appHandle) {
    pathname.value = ctx.urlPathname
    appHandle = hydrate(<App pageContext={ctx} />, container)
    return
  }

  document.title = getTitle(ctx)
  appHandle.render(<App pageContext={ctx} />)
  pathname.value = ctx.urlPathname
}

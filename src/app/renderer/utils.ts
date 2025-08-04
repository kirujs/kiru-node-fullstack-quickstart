// /pages/utils.js
// Environment: server & client

import type { PageContext } from "vike/types"
import { getUseConfigHookInternal } from "$/app/hooks/useConfig"

export { getTitle }

function getTitle(pageContext: PageContext) {
  const { title } = getUseConfigHookInternal(pageContext)
  if (title) return title

  // The value exported by /pages/**/+title.js is available at pageContext.config.title
  const val = pageContext.config.title
  if (typeof val === "function") {
    return val(pageContext)
  }
  return val || "Vite + Vike + TS + Kaioken"
}

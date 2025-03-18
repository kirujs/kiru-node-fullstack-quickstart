// /pages/utils.js
// Environment: server & client

import { getUseConfigHookInternal } from "$/app/hooks/useConfig"
import type { PageContext } from "vike/types"

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

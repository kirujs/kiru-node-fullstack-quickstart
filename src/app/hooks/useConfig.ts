import { usePageContext } from "$/app/context/pageContext"
import { getPageContext } from "vike/getPageContext"
import { PageContext } from "vike/types"

type ConfigFromHook = {
  title?: string
}

export type PageContextInternal = {
  _configFromHook?: ConfigFromHook
  _headAlreadySet?: boolean
}

export function useConfig(): (config: ConfigFromHook) => void {
  const pageContext = (getPageContext() ?? usePageContext()) as PageContext &
    PageContextInternal
  return (config: ConfigFromHook) => {
    setPageContextConfigFromHook(config, pageContext)
    if ("window" in globalThis && config.title) {
      window.document.title = config.title
    }
  }
}

function setPageContextConfigFromHook(
  config: ConfigFromHook,
  pageContext: PageContext & PageContextInternal
) {
  // @ts-ignore
  pageContext._configFromHook ??= {}
  Object.keys(config).forEach((configName) => {
    // Skip HTML only configs which the client-side doesn't need, saving KBs sent to the client as well as avoiding serialization errors.
    //if (pageContext.isClientSideNavigation) return

    const configValue = config[configName as keyof ConfigFromHook]
    if (configValue === undefined) return
    // @ts-ignore
    pageContext._configFromHook![configName] = configValue as any
  })
}

export const getUseConfigHookInternal = (
  pageContext: PageContext
): ConfigFromHook => {
  // @ts-ignore
  return pageContext._configFromHook ?? {}
}

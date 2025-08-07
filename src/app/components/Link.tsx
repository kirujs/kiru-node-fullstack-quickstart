import { type ElementProps, unwrap } from "kiru"
import { usePageContext } from "$/app/context/pageContext"

export function Link({ href, children, ...rest }: ElementProps<"a">) {
  const { urlPathname } = usePageContext()
  const _href = unwrap(href)!
  const isActive =
    _href === "/" ? urlPathname === _href : urlPathname.startsWith(_href)
  return (
    <a href={href} className={isActive ? "is-active" : undefined} {...rest}>
      {children}
    </a>
  )
}

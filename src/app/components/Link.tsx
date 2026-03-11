import { computed, unwrap, type ElementProps } from "kiru"
import { usePageContext } from "$/app/context/pageContext"

export const Link: Kiru.FC<ElementProps<"a">> = ({ href }) => {
  const { $pathname: pathname } = usePageContext()
  const _href = unwrap(href) ?? "/"
  const isActive = computed(() => {
    const _pathName = pathname.value
    return _href === "/" ? _pathName === href : _pathName.startsWith(_href)
  })
  const className = computed(() => (isActive.value ? "is-active" : undefined))

  return ({ children, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  )
}

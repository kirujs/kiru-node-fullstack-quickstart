import { PageContext as VikePageContext } from "vike/types"
import { PageContext } from "$/app/context/pageContext"
import LayoutDefault from "$/app/layouts/LayoutDefault"

export function App({ pageContext }: { pageContext: VikePageContext }) {
  const { Page, Layout } = pageContext.config
  return (
    <PageContext value={pageContext}>
      <Layouts layouts={Layout ?? [LayoutDefault]}>
        <Page />
      </Layouts>
    </PageContext>
  )
}

function Layouts({
  layouts,
  children,
}: {
  layouts: VikePageContext["config"]["Layout"]
  children: JSX.Children
}) {
  return layouts.reduce((children, Layout) => {
    return <Layout>{children}</Layout>
  }, children)
}

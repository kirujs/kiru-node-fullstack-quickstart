import { PageContext } from "vike/types"
import { PageContextProvider } from "$/app/context/pageContext"
import { DataContextProvider } from "$/app/context/dataContext"
import LayoutDefault from "$/app/layouts/LayoutDefault"

export function App({ pageContext }: { pageContext: PageContext }) {
  const { Page, Layout } = pageContext.config
  return (
    <PageContextProvider pageContext={pageContext}>
      <DataContextProvider data={pageContext.data}>
        <Layouts layouts={Layout ?? [LayoutDefault]}>
          <Page />
        </Layouts>
      </DataContextProvider>
    </PageContextProvider>
  )
}

function Layouts({
  layouts,
  children,
}: {
  layouts: PageContext["config"]["Layout"]
  children: JSX.Children
}) {
  return layouts.reduce((children, Layout) => {
    return <Layout>{children}</Layout>
  }, children)
}

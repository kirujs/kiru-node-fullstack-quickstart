import { createContext, useContext } from "kaioken"

export { useData, DataContextProvider }

const DataContext = createContext<any>(null)

function DataContextProvider({
  data,
  children,
}: {
  data: any
  children: JSX.Children
}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

function useData<T>() {
  return useContext<T>(DataContext)
}

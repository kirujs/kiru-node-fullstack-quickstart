import { useConfig } from "$/app/hooks/useConfig.js"
import { Counter } from "./Counter.js"

export default function Page() {
  const setConfig = useConfig()
  setConfig({ title: "Hello world!" })
  return (
    <>
      <h1 className="font-bold text-3xl pb-4">My Vite + Vike + Kaioken app</h1>
      <div>
        <Counter />
      </div>
    </>
  )
}

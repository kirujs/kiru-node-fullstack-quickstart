import "./style.css"
import { useSignal } from "kaioken"
import { navigate } from "vike/client/router"
import { type User } from "better-auth"

import { usePageContext } from "../context/pageContext"
import { authClient } from "../global/auth-client"
import { Link } from "../components/Link.js"

export default function LayoutDefault({
  children,
}: {
  children: JSX.Children
}) {
  const { session } = usePageContext()
  return (
    <div className={"flex max-w-5xl m-auto"}>
      <Sidebar>
        <Logo />
        <Link href="/">Welcome</Link>
        {session && <Link href="/todo">Todo</Link>}
        <Link href="/star-wars">Data Fetching</Link>
        <AuthSection user={session?.user} />
      </Sidebar>
      <Content>{children}</Content>
    </div>
  )
}

function AuthSection({ user }: { user?: User }) {
  const signingOut = useSignal(false)
  if (user) {
    return (
      <div className="flex w-full p-2 my-2 flex-col border-2 border-neutral-300">
        <span className="font-bold">Logged in as: {user.name}</span>

        <Link
          href="#"
          onclick={() => {
            signingOut.value = true
            authClient
              .signOut({
                fetchOptions: {
                  onSuccess: () => {
                    navigate("/")
                  },
                },
              })
              .finally(() => {
                signingOut.value = false
              })
          }}
        >
          {signingOut.value ? "Signing out..." : "Logout"}
        </Link>
      </div>
    )
  }

  return <Link href="/login">Login</Link>
}

function Sidebar({ children }: { children: JSX.Children }) {
  return (
    <div
      id="sidebar"
      className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200/20"}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: JSX.Children }) {
  return (
    <div id="page-container" className="w-full">
      <div id="page-content" className="p-5 pb-12 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className={"p-5 mb-2"}>
      <a href="/">
        <img src="/logo.svg" height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}

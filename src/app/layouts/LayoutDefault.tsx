import "./style.css"

import type { User } from "lucia"
import { Link } from "../components/Link.js"
import { usePageContext } from "$/app/context/pageContext"
import { navigate } from "vike/client/router"
import { useCallback } from "kaioken"

export default function LayoutDefault({
  children,
}: {
  children: JSX.Children
}) {
  const { user } = usePageContext()
  return (
    <div className={"flex max-w-5xl m-auto"}>
      <Sidebar>
        <Logo />
        <Link href="/">Welcome</Link>
        {user && <Link href="/todo">Todo</Link>}
        <Link href="/star-wars">Data Fetching</Link>
        <AuthSection user={user} />
      </Sidebar>
      <Content>{children}</Content>
    </div>
  )
}

function AuthSection({ user }: { user?: User }) {
  const handleLogout = useCallback(async (e: Event) => {
    e.preventDefault()
    try {
      await fetch("/api/logout", { method: "POST" })
      navigate("/")
    } catch (err) {
      console.error("An unknown error has occurred :", err)
    }
  }, [])
  if (user) {
    return (
      <div className="flex w-full p-2 my-2 flex-col border-2 border-neutral-300">
        <span className="font-bold">Logged in as: {user.username}</span>

        <Link href="#" onclick={handleLogout}>
          Logout
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
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen"}>
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

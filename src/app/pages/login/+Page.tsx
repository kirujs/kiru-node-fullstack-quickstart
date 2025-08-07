import { Derive, ElementProps, unwrap } from "kiru"
import { className as cls } from "kiru/utils"
import { Button } from "$/app/components/Button"
import { Input } from "$/app/components/Input"
import { GithubIcon } from "$/app/components/icons/GithubIcon"
import { Loader } from "$/app/components/Loader"

import { formMode, formState } from "./state"
import {
  handleForgotPassword,
  handleGithubSignIn,
  handleSignIn,
  handleSignUp,
} from "./actions"

export default function Page() {
  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    if (formMode.value === "login") {
      handleSignIn()
    } else {
      handleSignUp()
    }
  }

  return (
    <div className="w-full grow flex items-center justify-center">
      <div className="w-xs max-w-lg p-4 rounded-lg flex flex-col gap-4 justify-center bg-white/5 border border-white/10">
        <div className="flex items-center justify-between relative">
          <Derive from={formMode}>
            {(mode) => (
              <>
                <h1 className="text-2xl font-bold">
                  {mode === "login" ? "Login" : "Sign Up"}
                </h1>
                {mode === "login" ? (
                  <button
                    className="text-neutral-300 hover:text-white hover:underline"
                    onclick={() => (formMode.value = "signup")}
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    className="text-neutral-300 hover:text-white hover:underline"
                    onclick={() => (formMode.value = "login")}
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </Derive>
        </div>
        <form onsubmit={handleSubmit} className="flex flex-col gap-4">
          <Derive from={formMode}>
            {(mode) =>
              mode === "signup" && (
                <FormItem>
                  <FormItemLabel htmlFor="name">Name</FormItemLabel>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    autocomplete={"name" as any}
                    bind:value={formState.name}
                    required
                  />
                </FormItem>
              )
            }
          </Derive>
          <FormItem>
            <FormItemLabel htmlFor="email">Email</FormItemLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="me@example.com"
              autocomplete={"email" as any}
              bind:value={formState.email}
              required
            />
          </FormItem>
          <FormItem>
            <div className="flex items-center justify-between">
              <FormItemLabel htmlFor="password">Password</FormItemLabel>
              <Derive from={formMode}>
                {(mode) =>
                  mode === "login" && (
                    <button
                      type="button"
                      onclick={handleForgotPassword}
                      className="text-neutral-400 hover:text-white hover:underline text-xs"
                    >
                      Forgot your password?
                    </button>
                  )
                }
              </Derive>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              bind:value={formState.password}
              required
            />
          </FormItem>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={formState.submitting}
            >
              <Derive
                from={formMode}
                children={(mode) => (mode === "login" ? "Login" : "Sign Up")}
              />
              <Derive
                from={formState.submitting}
                children={(submitting) => submitting && <Loader />}
              />
            </Button>
            <ProviderButton onclick={handleGithubSignIn}>
              <span>Login with Github</span>
              <GithubIcon className="w-4 h-4" />
            </ProviderButton>
          </div>
          <Derive from={formState.error}>
            {(error) => error && <i className="text-red-400">{error}</i>}
          </Derive>
        </form>
      </div>
    </div>
  )
}

function FormItemLabel(props: ElementProps<"label">) {
  return (
    <label
      className={cls(unwrap(props.className), "text-neutral-300 font-medium")}
      {...props}
    />
  )
}

function FormItem(props: ElementProps<"div">) {
  return (
    <div
      className={cls(unwrap(props.className), "flex flex-col gap-1")}
      {...props}
    />
  )
}

function ProviderButton(props: ElementProps<"button">) {
  return (
    <button
      disabled={formState.submitting}
      className={cls(
        unwrap(props.className),
        "flex gap-2 items-center justify-center w-full",
        "bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-neutral-300",
        "hover:bg-white/10 transition-all disabled:opacity-50"
      )}
      {...props}
    />
  )
}

import { navigate } from "vike/client/router"
import { authClient } from "$/app/global/auth-client"
import { getFormValues, formState } from "./state"

const authReqOptions = {
  onSuccess: () => {
    formState.error.value = null
    navigate("/")
  },
  onError: (err: { error: { message: string } }) => {
    formState.error.value = err.error.message
  },
}

export const handleGithubSignIn = () => {
  formState.submitting.value = true
  authClient.signIn.social({
    provider: "github",
  })
}

export const handleForgotPassword = () => {
  formState.submitting.value = true
  const { email } = getFormValues()

  authClient
    .forgetPassword({ email }, authReqOptions)
    .finally(() => (formState.submitting.value = false))
}

export const handleSignUp = () => {
  formState.submitting.value = true
  const { name, email, password } = getFormValues()

  authClient.signUp
    .email({ name, email, password }, authReqOptions)
    .finally(() => (formState.submitting.value = false))
}

export const handleSignIn = () => {
  formState.submitting.value = true
  const { email, password } = getFormValues()

  authClient.signIn
    .email({ email, password }, authReqOptions)
    .finally(() => (formState.submitting.value = false))
}

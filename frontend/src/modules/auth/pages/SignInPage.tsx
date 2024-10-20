import { useCallback } from 'react'

import { Page } from '@frontend/shared/layout'

import { SignInForm } from '../components/SignInForm'
import { useSignIn } from '../hooks/useSignIn'

export function SignInPage() {
  const [signInRequest, signInRequestState] = useSignIn()

  const handleSignInFormSubmit = useCallback(
    (variables: { email: string; password: string }) => {
      signInRequest({ variables })
    },
    [signInRequest]
  )

  return (
    <Page>
      <SignInForm
        onSubmit={handleSignInFormSubmit}
        error={signInRequestState.error}
      />
    </Page>
  )
}

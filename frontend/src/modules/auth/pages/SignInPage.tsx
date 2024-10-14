import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

import { SignInForm } from '../components/SignInForm'

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        login
      }
      token
    }
  }
`)

export function SignInPage() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user })
      navigate('/')
    },
    onError: () => {},
  })

  const handleSignInFormSubmit = useCallback(
    (variables: { email: string; password: string }) => {
      signInRequest({ variables })
    },
    [signInRequest]
  )

  return (
    <Page>
      <SignInForm onSubmit={handleSignInFormSubmit} />
      {signInRequestState.error ? (
        <Box color="red">{signInRequestState.error.message}</Box>
      ) : null}
    </Page>
  )
}

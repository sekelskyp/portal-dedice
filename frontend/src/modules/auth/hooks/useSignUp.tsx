import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@frontend/route'

import { useAuth } from '../auth-core'

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($registerInput: RegisterInput!) {
    signUp(registerInput: $registerInput) {
      user {
        id
        login
      }
      token
    }
  }
`)

export function useSignUp() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [signUpRequest, signUpRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      /* WIP: Missing logic for sending verification link*/
      auth.signIn({ token, user })
      navigate(route.home())
    },
    onError: () => {},
  })

  return [signUpRequest, signUpRequestState] as const
}

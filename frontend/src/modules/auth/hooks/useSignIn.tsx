import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'

import { useAuth } from '../auth-core'

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

export function useSignIn() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user })
      navigate('/')
    },
    onError: () => {},
  })

  return [signInRequest, signInRequestState] as const
}

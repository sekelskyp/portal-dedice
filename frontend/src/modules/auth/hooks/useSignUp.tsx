import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'

import { useAuth } from '../auth-core'

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp(
    $email: String!
    $gender: String!
    $name: String!
    $surname: String!
    $userName: String!
    $password: String!
  ) {
    signUp(
      email: $email
      gender: $gender
      name: $name
      surname: $surname
      userName: $userName
      password: $password
    ) {
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
      navigate('/auth/signin')
      /* WIP: Missing logic for sending verification link*/
      auth.signIn({ token, user })
    },
    onError: () => {},
  })

  return [signUpRequest, signUpRequestState] as const
}

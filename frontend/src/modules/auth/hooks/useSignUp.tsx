import { useMutation } from '@apollo/client'
import { route } from '@lib/route'
import { useNavigate } from 'react-router-dom'

import { gql } from '@src/gql'

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($registerInput: RegisterInput!) {
    signUp(registerInput: $registerInput) {
      id
    }
  }
`)

export function useSignUp() {
  const navigate = useNavigate()

  const [signUpRequest, signUpRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data, context) => {
      const email = context?.variables?.registerInput?.email
      if (email) navigate(route.confirmEmail(), { state: { email } })
    },
    onError: () => {},
  })

  return [signUpRequest, signUpRequestState] as const
}

import { useMutation } from '@apollo/client'
import { route } from '@lib/route'
import { useNavigate } from 'react-router-dom'

import { gql } from '@src/gql'

import { useAuth } from '../auth-core'

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      user {
        addressId
        address {
          id
          municipality
          postalCode
          street
          streetNumber
        }
        confirmed
        displayName
        email
        gender
        id
        name
        phone
        sendNotifications
        surname
        type
        notaryId
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
      auth.signIn({
        token,
        user: {
          ...user,
          addressId: user.addressId ?? '',
          notaryId: user.notaryId ?? '',
        },
      })
      navigate(route.portal())
    },
    onError: () => {},
  })

  return [signInRequest, signInRequestState] as const
}

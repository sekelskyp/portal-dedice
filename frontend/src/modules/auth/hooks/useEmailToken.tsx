/*
import { gql, useMutation } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth-core'

const EMAIL_TOKEN_MUTATION = gql( `
  mutation EmailVerification($token: String!) {
    confirmEmailVerification(token: $token)
  }
`)

export function useEmailToken() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('token')
  const auth = useAuth()
  const navigate = useNavigate()

  const [emailTokenRequest, emailTokenRequestState] = useMutation(EMAIL_TOKEN_MUTATION, {
    onCompleted: () => {
      console.log('Email byl úspěšně ověřen.')
    },
    onError() {
      console.log('error při mutaci.')
    })
  }
*/

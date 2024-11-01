import { gql, useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'

const EMAIL_TOKEN_MUTATION = gql(`
  mutation EmailVerification($token: String!) {
    confirmEmailVerification(token: $token)
  }
`)

export function useEmailToken() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('token')

  const [emailTokenRequest, emailTokenRequestState] = useMutation(
    EMAIL_TOKEN_MUTATION,
    {
      variables: { token: queryToken },
    }
  )

  return { emailTokenRequest, emailTokenRequestState, queryToken }
}

import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'
import { route } from '@shared/route'

const REQUEST_PASSWORD_RESET = gql(/* GraphQL */ `
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`)

const RESET_PASSWORD = gql(/* GraphQL */ `
  mutation xdd($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token)
  }
`)

export function useRequestPasswordReset() {
  const navigate = useNavigate()
  const [requestPasswordResetRequest, requestPasswordResetRequestState] =
    useMutation(REQUEST_PASSWORD_RESET, {
      onCompleted: () => {
        toaster.create({
          title:
            'Na vaši e-mailovou adresu byl odeslán odkaz pro obnovení hesla.',
          type: 'success',
          duration: 5000,
        })
        navigate(route.signUp())
      },
      onError: () => {
        toaster.create({
          title: 'Něco se pokazilo, zkuste to prosím znovu.',
          type: 'error',
          duration: 5000,
        })
      },
    })

  return [
    requestPasswordResetRequest,
    requestPasswordResetRequestState,
  ] as const
}

export function useResetPassword() {
  const navigate = useNavigate()
  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    RESET_PASSWORD,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Heslo bylo úspěšně změněno.',
          type: 'success',
          duration: 5000,
        })
        navigate(route.signIn())
      },
      onError: (error) => {
        toaster.create({
          title: error.message,
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [resetPasswordRequest, resetPasswordRequestState] as const
}

import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

const CHANGE_PASSWORD = gql(/* GraphQL */ `
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
      id
    }
  }
`)

export function useChangePassword() {
  const [changePasswordRequest, changePasswordRequestState] = useMutation(
    CHANGE_PASSWORD,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Heslo bylo úspěšně změněno.',
          type: 'success',
          duration: 5000,
        })
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

  return [changePasswordRequest, changePasswordRequestState] as const
}

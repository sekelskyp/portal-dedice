import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

import { GET_ALL_USERS } from './useGetAllUsers'

const CHANGE_USER_STATUS = gql(/* GraphQL */ `
  mutation ChangeUserStatus($userId: Float!) {
    toggleUserConfirmation(userId: $userId) {
      confirmed
    }
  }
`)

export function useChangeUserStatus() {
  const [changeUserStatusRequest, changeUserStatusRequestState] = useMutation(
    CHANGE_USER_STATUS,
    {
      refetchQueries: [GET_ALL_USERS],
      onCompleted: (data) => {
        const message = data.toggleUserConfirmation.confirmed
          ? 'Uživatel byl úspěšně aktivován.'
          : 'Uživatel byl úspěšně deaktivován.'

        toaster.create({
          title: message,
          type: 'success',
          duration: 5000,
        })
      },
      onError: () => {
        toaster.create({
          title: 'Při změně stavu uživatele došlo k chybě.',
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [changeUserStatusRequest, changeUserStatusRequestState] as const
}

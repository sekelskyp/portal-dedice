import { useMutation } from '@apollo/client'
import { toaster } from '@components/ui/toaster'
import { route } from '@lib/route'
import { gql } from '@src/gql'
import { useNavigate } from 'react-router-dom'

const CHANGE_PASSWORD = gql(/* GraphQL */ `
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`)

export function useChangePassword() {
  const navigate = useNavigate()

  const [changePasswordRequest, changePasswordRequestState] = useMutation(
    CHANGE_PASSWORD,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Heslo bylo úspěšně změněno.',
          type: 'success',
          duration: 5000,
        })
        navigate(route.portal())
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

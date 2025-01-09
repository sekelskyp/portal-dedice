import { GetUsersQuery } from '@frontend/gql/graphql'
import { AuthUser } from '@frontend/modules/auth/auth-core'

export const loadUsers = ({
  data,
  user,
}: {
  data: GetUsersQuery | undefined
  user: AuthUser | null
}) => {
  if (data?.getAllUsers) {
    return data.getAllUsers
      .filter((item) => item.id !== user?.id)
      .map((item) => ({
        id: item.id,
        displayName: item.displayName || `${item.name} ${item.surname}`,
        type: item.type,
        address: item.address
          ? `${item.address.street || ''}, ${item.address.streetNumber || ''}, ${
              item.address.postalCode || ''
            }, ${item.address.municipality || ''}`
          : '',
        confirmed: item.confirmed,
        notaryId: item.notaryId || '',
      }))
  }
}

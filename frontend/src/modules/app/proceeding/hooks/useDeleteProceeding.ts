import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { toaster } from '@frontend/shared/design-system'

import { GET_ALL_PROCEEDINGS } from './useGetAllProceedings'
import { GET_PROCEEDINGS_BY_NOTARY_ID } from './useNotaryProcedures'

const DELETE_PROCEEDING_MUTATION = gql(/* GraphQL */ `
  mutation DeleteProceeding($ids: [Int!]!) {
    deleteProceedingsByIds(ids: $ids)
  }
`)

export function useDeleteProceeding() {
  const { user } = useAuth()
  const isAdmin = user?.type === 'Admin'
  const isNotary = user?.type === 'Notary'

  const getRefetchQueries = () => {
    if (isAdmin) return [GET_ALL_PROCEEDINGS]
    if (isNotary) return [GET_PROCEEDINGS_BY_NOTARY_ID]
    return []
  }

  const [deleteProceedingRequest, deleteProceedingRequestState] = useMutation(
    DELETE_PROCEEDING_MUTATION,
    {
      refetchQueries: getRefetchQueries(),
      onCompleted: () => {
        toaster.create({
          title: 'Řízení bylo úspěšně smazáno.',
          type: 'success',
          duration: 5000,
        })
      },
      onError: () => {
        toaster.create({
          title: 'Při mazání řízení došlo k chybě.',
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [deleteProceedingRequest, deleteProceedingRequestState] as const
}

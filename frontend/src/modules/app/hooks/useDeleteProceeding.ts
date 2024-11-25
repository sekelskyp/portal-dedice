import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

import { GET_ALL_PROCEEDINGS } from './useNotaryProcedures'

//TODO: fix query and components

const DELETE_PROCEEDING_MUTATION = gql(/* GraphQL */ `
  mutation DeleteProceeding($ids: [Int!]!) {
    deleteProceedingsByIds(ids: $ids)
  }
`)

export function useDeleteProceeding() {
  const [deleteProceedingRequest, deleteProceedingRequestState] = useMutation(
    DELETE_PROCEEDING_MUTATION,
    {
      refetchQueries: [GET_ALL_PROCEEDINGS],
      onCompleted: () => {
        toaster.create({
          title: 'Řízení bylo úspěšně smazáno.',
          type: 'success',
          duration: 5000,
        })
      },
      onError: (error) => {
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

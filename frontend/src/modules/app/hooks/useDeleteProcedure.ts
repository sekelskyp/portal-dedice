import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

const DELETE_PROCEDURE_MUTATION = gql(/* GraphQL */ `
  mutation DeleteProcedure($ids: [Int!]!) {
    deleteProceduresByIds(ids: $ids)
  }
`)

export function useDeleteProcedure() {
  const [deleteProcedureRequest, deleteProcedureRequestState] = useMutation(
    DELETE_PROCEDURE_MUTATION,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Řízení bylo úspěšně smazáno.',
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

  return [deleteProcedureRequest, deleteProcedureRequestState] as const
}

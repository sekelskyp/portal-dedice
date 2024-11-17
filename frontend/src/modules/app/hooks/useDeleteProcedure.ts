import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

import { GET_ALL_PROCEDURES } from './useNotaryProcedures'

const DELETE_PROCEDURE_MUTATION = gql(/* GraphQL */ `
  mutation DeleteProcedure($ids: [Int!]!) {
    deleteProceduresByIds(ids: $ids)
  }
`)

export function useDeleteProcedure() {
  const [deleteProcedureRequest, deleteProcedureRequestState] = useMutation(
    DELETE_PROCEDURE_MUTATION,
    {
      refetchQueries: [GET_ALL_PROCEDURES],
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

  return [deleteProcedureRequest, deleteProcedureRequestState] as const
}

import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'

const GET_PROCEDURES_BY_NOTARY_ID = gql(/* GraphQL */ `
  query GetProceduresByNotaryId($notaryId: Int!) {
    getProceduresByNotaryId(notaryId: $notaryId) {
      id
      name
      startDate
      state
      deceasedContact {
        displayName
      }
    }
  }
`)

export function useNotaryProcedures() {
  const auth = useAuth()
  const userId = parseInt(auth.user?.id ?? '0', 10)

  const { data, loading, error } = useQuery(GET_PROCEDURES_BY_NOTARY_ID, {
    variables: {
      notaryId: userId,
    },
  })

  const cleanData = data
    ? {
        ...data,
        getProceduresByNotaryId: data.getProceduresByNotaryId.map(
          ({ __typename, ...procedure }) => procedure
        ),
      }
    : null

  return { data: cleanData, loading, error }
}

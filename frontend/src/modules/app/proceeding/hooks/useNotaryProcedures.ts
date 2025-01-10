import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'

export const GET_PROCEEDINGS_BY_NOTARY_ID = gql(/* GraphQL */ `
  query GetProceedingsByNotaryId($userId: Int!) {
    getNotaryProceedingsForUser(userId: $userId) {
      id
      name
      startDate
      state
      deceasedDisplayName
    }
  }
`)

export function useNotaryProcedures() {
  const auth = useAuth()
  const id = auth.user?.id ?? '0'

  const { data, loading, error } = useQuery(GET_PROCEEDINGS_BY_NOTARY_ID, {
    variables: {
      userId: +id,
    },
  })

  return { data, loading, error }
}

import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

export const GET_ALL_PROCEEDINGS = gql(/* GraphQL */ `
  query GetAllProceedings {
    getAllProceedings {
      id
      name
      startDate
      state
      deceasedDisplayName
    }
  }
`)

export function useGetAllProceedings() {
  const { data, loading, error } = useQuery(GET_ALL_PROCEEDINGS)

  return { data, loading, error }
}

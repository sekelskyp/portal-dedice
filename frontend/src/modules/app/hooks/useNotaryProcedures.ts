import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

//TODO: fix query and components

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

export function useNotaryProcedures() {
  const { data, loading, error } = useQuery(GET_ALL_PROCEEDINGS)

  const cleanData = data
    ? {
        ...data,
        getProceduresByNotaryId: data.getAllProceedings.map(
          ({ __typename, ...procedure }) => procedure
        ),
      }
    : null

  return { data: cleanData, loading, error }
}

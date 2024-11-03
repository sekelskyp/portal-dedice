import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

//const GET_PROCEDURES_BY_NOTARY_ID = gql(/* GraphQL */ `
//  query GetProceduresByNotaryId($notaryId: Int!) {
//    getProceduresByNotaryId(notaryId: $notaryId) {
//      id
//      name
//      startDate
//      state
//      deceasedContact {
//        displayName
//      }
//    }
//  }
//`)

const GET_ALL_PROCEDURES = gql(/* GraphQL */ `
  query GetAllProcedures {
    getAllProcedures {
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
  const { data, loading, error } = useQuery(GET_ALL_PROCEDURES)

  const cleanData = data
    ? {
        ...data,
        getProceduresByNotaryId: data.getAllProcedures.map(
          ({ __typename, ...procedure }) => procedure
        ),
      }
    : null

  return { data: cleanData, loading, error }
}

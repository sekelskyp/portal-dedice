import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_DOCUMENTS_BY_PROCEEDING_ID = gql(/* GraphQL */ `
  query GetDocumentsByProceedingId($proceedingId: Int!) {
    getDocumentsByProceedingId(proceedingId: $proceedingId) {
      id
      fileName
      createDate
      fileType
    }
  }
`)

export function useGetDocuments({ proceedingId }: { proceedingId: number }) {
  const { data, loading, error } = useQuery(GET_DOCUMENTS_BY_PROCEEDING_ID, {
    variables: {
      proceedingId: proceedingId,
    },
  })

  return {
    data,
    loading,
    error,
  }
}

import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_DOCUMENTS_BY_PROCEDURE_ID = gql(/* GraphQL */ `
  query GetDocumentsByProcedureId($procedureId: Int!) {
    getProcedureById(id: $procedureId) {
      documents {
        id
        fileName
        createDate
        fileData
        fileType
      }
    }
  }
`)

export function useGetDocuments({ procedureId }: { procedureId: number }) {
  const { data, loading, error } = useQuery(GET_DOCUMENTS_BY_PROCEDURE_ID, {
    variables: {
      procedureId: procedureId,
    },
  })

  return {
    data,
    loading,
    error,
  }
}

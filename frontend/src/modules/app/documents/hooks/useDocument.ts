import { useLazyQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_DOCUMENT_BY_ID = gql(/* GraphQL */ `
  query GetDocumentById($id: ID!) {
    getDocumentById(id: $id) {
      fileData
      fileType
      fileName
      createDate
    }
  }
`)

export function useDocument() {
  const [getDocument, { data, loading, error }] =
    useLazyQuery(GET_DOCUMENT_BY_ID)

  return {
    getDocument,
    data,
    loading,
    error,
  }
}

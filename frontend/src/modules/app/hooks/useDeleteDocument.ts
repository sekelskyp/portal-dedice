import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'

const DELETE_DOCUMENT_MUTATION = gql(/* GraphQL */ `
  mutation DeleteDocument($id: ID!) {
    deleteDocumentsByIds(ids: [$id])
  }
`)

export function useDeleteDocument() {
  const [deleteDocumentRequest, deleteDocumentRequestState] = useMutation(
    DELETE_DOCUMENT_MUTATION,
    {
      onCompleted: () => {},
      onError: () => {},
    }
  )

  return [deleteDocumentRequest, deleteDocumentRequestState] as const
}

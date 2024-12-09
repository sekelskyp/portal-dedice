import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

const DELETE_DOCUMENT_MUTATION = gql(/* GraphQL */ `
  mutation DeleteDocument($id: ID!) {
    deleteDocumentsByIds(ids: [$id])
  }
`)

export function useDeleteDocument() {
  const [deleteDocumentRequest, deleteDocumentRequestState] = useMutation(
    DELETE_DOCUMENT_MUTATION,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Dokument byl úspěšně smazán.',
          type: 'success',
          duration: 5000,
        })
      },
      onError: () => {
        toaster.create({
          title: 'Při mazání dokumentu došlo k chybě.',
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [deleteDocumentRequest, deleteDocumentRequestState] as const
}

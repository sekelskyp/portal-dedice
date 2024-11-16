import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@shared/route'

const CREATE_DOCUMENT_MUTATION = gql(/* GraphQL */ `
  mutation CreateDocument($data: UploadDocumentInput!) {
    createDocument(data: $data) {
      id
      fileType
      createDate
    }
  }
`)

export function useCreateDocument() {
  const navigate = useNavigate()

  const [createDocumentRequest, createDocumentRequestState] = useMutation(
    CREATE_DOCUMENT_MUTATION,
    {
      onCompleted: (data) => {
        console.log('Document created:', data)
        navigate(route.portal())
      },
      onError: (error) => {
        console.error('Error creating document:', error)
      },
    }
  )

  return [createDocumentRequest, createDocumentRequestState] as const
}

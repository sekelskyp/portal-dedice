import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@shared/route'

const UPDATE_DOCUMENT_MUTATION = gql(/* GraphQL */ `
  mutation UploadDocument($data: UploadFileToProceedingInput!) {
    uploadAttachmentToProceeding(data: $data)
  }
`)

export function useUploadDocument() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [uploadDocumentRequest, uploadDocumentRequestState] = useMutation(
    UPDATE_DOCUMENT_MUTATION,
    {
      onCompleted: () => {
        navigate(route.inheritanceProcedure(id))
      },
      onError: (error) => {
        console.error('Error uploading document:', error)
      },
    }
  )

  return [uploadDocumentRequest, uploadDocumentRequestState] as const
}

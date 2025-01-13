import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'
import { route } from '@shared/route'

const UPDATE_DOCUMENT_MUTATION = gql(/* GraphQL */ `
  mutation UploadDocument($data: UploadFileToProceedingInput!) {
    uploadAttachmentToProceeding(data: $data)
  }
`)

export function useUploadDocument() {
  const navigate = useNavigate()
  const { proceedingId } = useParams<{ proceedingId: string }>()

  const [uploadDocumentRequest, uploadDocumentRequestState] = useMutation(
    UPDATE_DOCUMENT_MUTATION,
    {
      onCompleted: () => {
        navigate(route.proceeding(proceedingId))
      },
      onError: () => {
        toaster.create({
          title: 'Při nahrání dokumentu došlo k chybě.',
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [uploadDocumentRequest, uploadDocumentRequestState] as const
}

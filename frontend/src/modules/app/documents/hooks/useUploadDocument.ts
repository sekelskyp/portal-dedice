import { useMutation } from '@apollo/client'
import { route } from '@lib/route'
import { gql } from '@src/gql'
import { useNavigate, useParams } from 'react-router-dom'

import { toaster } from '@shared/design-system'

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

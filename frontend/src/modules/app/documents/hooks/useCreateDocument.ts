import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'
import { route } from '@shared/route'

const CREATE_DOCUMENT_MUTATION = gql(/* GraphQL */ `
  mutation CreateDocument($data: UploadDocumentInput!) {
    createDocument(data: $data)
  }
`)

export function useCreateDocument() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [createDocumentRequest, createDocumentRequestState] = useMutation(
    CREATE_DOCUMENT_MUTATION,
    {
      onCompleted: () => {
        navigate(route.inheritanceProcedure(id))
      },
      onError: (error) => {
        toaster.create({
          title: error.message,
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [createDocumentRequest, createDocumentRequestState] as const
}

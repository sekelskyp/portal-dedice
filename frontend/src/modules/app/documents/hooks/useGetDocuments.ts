import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_ATTACHMENTS_BY_PROCEEDING_ID = gql(/* GraphQL */ `
  query GetAttachmentsByProceedingId($proceedingId: Int!) {
    getAttachmentsByProceedingId(proceedingId: $proceedingId) {
      fileUuid
      filename
      id
      mimetype
      uploadDate
    }
  }
`)

export function useGetAttachments({ proceedingId }: { proceedingId: number }) {
  const { data, loading, error } = useQuery(GET_ATTACHMENTS_BY_PROCEEDING_ID, {
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

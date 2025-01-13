import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@shared/route'

const PROCEEDING_MUTATION = gql(/* GraphQL */ `
  mutation createProceeding($data: CreateProceedingInput!) {
    createProceeding(data: $data)
  }
`)

export function useCreateProceeding() {
  const navigate = useNavigate()

  const [createProcedureRequest, createProcedureRequestState] = useMutation(
    PROCEEDING_MUTATION,
    {
      onCompleted: (data, context) => {
        navigate(route.portal())
      },
      onError: () => {},
    }
  )
  return [createProcedureRequest, createProcedureRequestState] as const
}

import { useMutation } from '@apollo/client'
import { route } from '@lib/route'
import { gql } from '@src/gql'
import { useNavigate } from 'react-router-dom'

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

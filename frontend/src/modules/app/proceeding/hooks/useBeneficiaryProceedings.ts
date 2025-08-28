import { useQuery } from '@apollo/client'
import { gql } from '@src/gql'
import { useAuth } from '@src/modules/auth'

const GET_PROCEEDINGS_BY_BENEFICIARY_ID = gql(/* GraphQL */ `
  query GetProceedingsByBeneficiaryId($userId: Int!) {
    getBeneficiaryProceedingsForUser(userId: $userId) {
      id
      name
      startDate
      state
      deceasedDisplayName
    }
  }
`)

export function useBeneficiaryProceedings() {
  const auth = useAuth()
  const id = auth.user?.id ?? '0'

  const { data, loading, error } = useQuery(GET_PROCEEDINGS_BY_BENEFICIARY_ID, {
    variables: {
      userId: +id,
    },
  })

  return { data, loading, error }
}

import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'

const GET_PROCEDURES_BY_BENEFICIARY_ID = gql(/* GraphQL */ `
  query GetProceduresByBeneficiaryId($beneficiaryId: Int!) {
    getProceduresByBeneficiaryId(beneficiaryId: $beneficiaryId) {
      id
      name
      startDate
      state
      deceasedContact {
        displayName
      }
    }
  }
`)

export function useBeneficiaryProcedures() {
  const auth = useAuth()
  const userId = parseInt(auth.user?.id ?? '0', 10)

  const { data, loading, error } = useQuery(GET_PROCEDURES_BY_BENEFICIARY_ID, {
    variables: {
      beneficiaryId: userId,
    },
  })

  const cleanData = data
    ? {
        ...data,
        getProceduresByBeneficiaryId: data.getProceduresByBeneficiaryId.map(
          ({ __typename, ...procedure }) => procedure
        ),
      }
    : null

  return { data: cleanData, loading, error }
}

import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'

//TODO: fix query and components

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
  //TODO: fix new user id
  const id = parseInt(auth.user?.beneficiaries[0]?.id ?? '0', 10)

  const { data, loading, error } = useQuery(GET_PROCEEDINGS_BY_BENEFICIARY_ID, {
    variables: {
      userId: id,
    },
  })

  const cleanData = data
    ? {
        ...data,
        getBeneficiaryProceedingsForUser:
          data.getBeneficiaryProceedingsForUser.map(
            ({ __typename, ...proceeding }) => proceeding
          ),
      }
    : null

  return { data: cleanData, loading, error }
}

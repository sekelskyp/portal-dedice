import { useQuery } from '@apollo/client/react/hooks/useQuery'

import { gql } from '@frontend/gql'

const GET_BENEFICIARY_GROUPS = gql(/* GraphQL */ `
  query GetBeneficiaryGroups($userId: Int!) {
    getBeneficiaryProceedingsForUser(userId: $userId) {
      id
      name
      state
    }
  }
`)

interface useGetBeneficiaryGroupsProps {
  userId: number
}

export function useGetBeneficiaryGroups({
  userId,
}: useGetBeneficiaryGroupsProps) {
  const { data, error, loading } = useQuery(GET_BENEFICIARY_GROUPS, {
    variables: { userId: userId },
  })
  return { data: data?.getBeneficiaryProceedingsForUser ?? [], error, loading }
}

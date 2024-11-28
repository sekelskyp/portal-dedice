import { useQuery } from '@apollo/client/react/hooks/useQuery'

import { gql } from '@frontend/gql'

const GET_NOTARY_GROUPS = gql(/* GraphQL */ `
  query GetNotaryGroups($userId: Int!) {
    getNotaryProceedingsForUser(userId: $userId) {
      id
      name
      state
    }
  }
`)

interface useGetNotaryGroupsProps {
  userId: number
}

export function useGetNotaryGroups({ userId }: useGetNotaryGroupsProps) {
  const { data, error, loading } = useQuery(GET_NOTARY_GROUPS, {
    variables: { userId: userId },
  })
  return { data: data?.getNotaryProceedingsForUser ?? [], error, loading }
}

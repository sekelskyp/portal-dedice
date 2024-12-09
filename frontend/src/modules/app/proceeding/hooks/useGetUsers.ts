import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_USERS = gql(/* GraphQL */ `
  query GetAllUsers($type: String!) {
    getAllUserByType(type: $type) {
      id
      name
      surname
      displayName
    }
  }
`)

export function useGetUsers({ type }: { type: string }) {
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { type: type },
  })

  return { data, loading, error }
}

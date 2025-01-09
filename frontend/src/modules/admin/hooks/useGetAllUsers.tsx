import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

export const GET_ALL_USERS = gql(/* GraphQL */ `
  query GetUsers {
    getAllUsers {
      id
      name
      surname
      displayName
      address {
        id
        municipality
        postalCode
        street
        streetNumber
      }
      addressId
      type
      confirmed
      notaryId
    }
  }
`)

export function useGetAllUsers() {
  const { data, loading, error } = useQuery(GET_ALL_USERS)

  return { data, loading, error }
}

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const FIND_NOTARY_QUERY = gql(/* GraphQL */ `
  query FindNotary($input: FindNotaryInput!) {
    findNotary(input: $input) {
      id
      user {
        id
        name
        surname
        displayName
        email
        gender
        phone
        address {
          street
          streetNumber
          municipality
          postalCode
        }
      }
    }
  }
`)

export function useGetNotary(birthDate?: Date, addressPostCode?: string) {
  const { data, loading, error } = useQuery(FIND_NOTARY_QUERY, {
    variables: {
      input: {
        deceasedPersonDateOfDeath: birthDate,
        addressPostCode: addressPostCode,
      },
    },
  })

  const notary = data?.findNotary.user

  return { notary, data, loading, error } as const
}

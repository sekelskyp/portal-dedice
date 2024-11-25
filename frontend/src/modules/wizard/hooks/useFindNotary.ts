import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

//TODO: fix query and components

const FIND_NOTARY_QUERY = gql(/* GraphQL */ `
  query FindNotary($input: FindNotaryInput!) {
    findNotary(input: $input) {
      id
      user {
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
        addressPostCode,
      },
    },
  })

  const notary = data?.findNotary.contact

  return { notary, data, loading, error } as const
}

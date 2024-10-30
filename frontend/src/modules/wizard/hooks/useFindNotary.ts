import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const FIND_NOTARY_QUERY = gql(/* GraphQL */ `
  query FindNotary($input: FindNotaryInput!) {
    findNotary(input: $input) {
      contact {
        id
        name
        surname
        displayName
        completeAddress
        email
        gender
        postalCode
        phone
        email
        gender
      }
    }
  }
`)

export function useGetNotary(birthDate?: Date, postalCode?: string) {
  const { data, loading, error } = useQuery(FIND_NOTARY_QUERY, {
    variables: {
      input: {
        deceasedPersonDateOfDeath: birthDate,
        postalCode,
      },
    },
  })

  const notary = data?.findNotary.contact

  return { notary, data, loading, error } as const
}

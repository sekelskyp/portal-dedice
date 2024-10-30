import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const GET_NOTARY_QUERY = gql(/* GraphQL */ `
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
  const { data, loading, error } = useQuery(GET_NOTARY_QUERY, {
    variables: {
      input: {
        deceasedPersonDateOfDeath: birthDate,
        postalCode,
      },
    },
  })

  const notary = data?.getNotaryByAddressAndBirthDate.contact

  return { notary, data, loading, error } as const
}

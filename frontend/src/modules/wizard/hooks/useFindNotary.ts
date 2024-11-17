import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { Suggestion } from '@frontend/shared/hooks/useAddressSuggestions'

const FIND_NOTARY_QUERY = gql(/* GraphQL */ `
  query FindNotary($input: FindNotaryInput!) {
    findNotary(input: $input) {
      contact {
        id
        name
        surname
        displayName
        email
        gender
        phone
        addressStreet
        addressStreetNumber
        addressMunicipality
        addressPostCode
      }
    }
  }
`)

export function useGetNotary(birthDate?: Date, address?: Suggestion) {
  const { data, loading, error } = useQuery(FIND_NOTARY_QUERY, {
    variables: {
      input: {
        deceasedPersonDateOfDeath: birthDate,
        postalCode: address?.zip,
      },
    },
  })

  const notary = data?.findNotary.contact

  return { notary, data, loading, error } as const
}

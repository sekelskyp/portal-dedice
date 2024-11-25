import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

//TODO: fix query and components
//TODO: this whole query is cooked, especially contact and main beneficiary

export const GET_PROCEEDING_QUERY = gql(/* GraphQL */ `
  query GetProceedingById($id: Int!) {
    getProceedingById(id: $id) {
      id
      name
      notary {
        id
        user {
          id
          name
          surname
          email
          displayName
        }
      }
      mainBeneficiaryId
      beneficiaries {
        id
        userId
        user {
          id
          email
          name
          surname
          displayName
          phone
          gender
          address {
            street
            streetNumber
            municipality
            postalCode
          }
        }
      }
      procedureAssets {
        id
        name
        value
      }
      state
    }
  }
`)

export function useProceeding({ proceedingId }: { proceedingId: number }) {
  const { data, loading, error } = useQuery(GET_PROCEEDING_QUERY, {
    variables: {
      id: proceedingId,
    },
  })

  return {
    data,
    loading,
    error,
  }
}

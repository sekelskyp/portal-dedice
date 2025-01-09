import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

export const GET_PROCEEDING_QUERY = gql(/* GraphQL */ `
  query GetProceedingById($getProceedingByIdId: Int!) {
    getProceedingById(id: $getProceedingByIdId) {
      procedureAssets {
        id
        proceedingId
        value
        name
        description
        type
        bankName
        carMakeName
        carRegistrationDate
        carType
        cin
      }
      mainBeneficiary {
        user {
          id
          displayName
          email
          phone
          name
          surname
          confirmed
        }
      }
      beneficiaries {
        id
        user {
          displayName
          email
          phone
          id
          name
          surname
          confirmed
        }
      }
      name
      deceasedDisplayName
      deceasedDateOfDeath
      deceasedDateOfBirth
      deceasedAddressId
      id
      state
      notaryId
      notary {
        user {
          address {
            id
            street
            streetNumber
            municipality
            postalCode
          }
          displayName
          email
          name
          surname
          phone
          id
          confirmed
        }
      }
    }
  }
`)

export function useProceeding(proceedingId: number) {
  const { data, loading, error } = useQuery(GET_PROCEEDING_QUERY, {
    variables: {
      getProceedingByIdId: proceedingId,
    },
  })

  return {
    data,
    loading,
    error,
  }
}

import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_PROCEDURE_QUERY = gql(/* GraphQL */ `
  query GetProcedureById($id: Int!) {
    getProcedureById(id: $id) {
      id
      name
      notary {
        id
        contact {
          id
          name
          surname
          email
          displayName
        }
      }
      mainContact {
        id
        name
        surname
        displayName
        gender
        phone
        email
        addressMunicipality
        addressPostCode
        addressStreet
        addressStreetNumber
      }
      beneficiaries {
        id
        userId
        user {
          id
          email
          contact {
            id
            name
            surname
            displayName
            email
            phone
            addressStreet
            addressStreetNumber
            addressMunicipality
            addressPostCode
            gender
          }
        }
        contactId
        contact {
          id
          email
          name
          surname
          displayName
        }
        deceasedRelation
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

export function useProcedure({ procedureId }: { procedureId: number }) {
  const { data, loading, error } = useQuery(GET_PROCEDURE_QUERY, {
    variables: {
      id: procedureId,
    },
  })

  return {
    data,
    loading,
    error,
  }
}

import { useMutation, useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { toaster } from '@frontend/shared/design-system'

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
          type
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
          type
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
          type
        }
      }
    }
  }
`)

export const REMOVE_BENEFICIARY_MUTATION = gql(/* GraphQL */ `
  mutation RemoveBeneficiaryFromProceeding(
    $beneficiaryId: Int!
    $proceedingId: Int!
  ) {
    removeBeneficiaryFromProceeding(
      beneficiaryId: $beneficiaryId
      proceedingId: $proceedingId
    )
  }
`)

export const ADD_BENEFICIARIES_MUTATION = gql(/* GraphQL */ `
  mutation AddBeneficiariesToProceeding(
    $userIds: [Int!]!
    $proceedingId: Int!
  ) {
    addBeneficiariesToProceeding(userIds: $userIds, proceedingId: $proceedingId)
  }
`)

export function useProceeding(proceedingId: number) {
  const { data, loading, error, refetch } = useQuery(GET_PROCEEDING_QUERY, {
    variables: {
      getProceedingByIdId: proceedingId,
    },
  })

  const [removeBeneficiaryFromProceeding] = useMutation(
    REMOVE_BENEFICIARY_MUTATION
  )

  const removeBeneficiary = (beneficiaryId: number) =>
    removeBeneficiaryFromProceeding({
      variables: {
        beneficiaryId,
        proceedingId,
      },
    })
      .then(() =>
        refetch().then(() => {
          toaster.success({ title: 'Dědic byl odebrán.' })
        })
      )
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se odebrat dědice.' })
      })

  const [addBeneficiariesToProceeding] = useMutation(ADD_BENEFICIARIES_MUTATION)

  const addBeneficiaries = (userIds: number[]) =>
    addBeneficiariesToProceeding({
      variables: {
        userIds,
        proceedingId,
      },
    })
      .then(() => {
        refetch().then(() => {
          toaster.success({ title: 'Dědic byl přidán.' })
        })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se přidat dědice.' })
      })

  const auth = useAuth()
  const isEditable = ['Notary', 'Admin'].includes(auth.user?.type ?? 'User')

  return {
    proceeding: data?.getProceedingById,
    loading,
    error,
    removeBeneficiary,
    addBeneficiaries,
    isEditable,
  }
}

import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { toaster } from '@frontend/shared/design-system'
import { Proceeding } from '@frontend/shared/types/proceeding'

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
        id
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
        id
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
    addBeneficiariesToProceeding(
      userIds: $userIds
      proceedingId: $proceedingId
    ) {
      id
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
  }
`)

export const REMOVE_MAIN_BENEFICIARY_MUTATION = gql(/* GraphQL */ `
  mutation RemoveMainBeneficiary($proceedingId: Int!) {
    removeMainBeneficiary(proceedingId: $proceedingId)
  }
`)

export const ADD_MAIN_BENEFICIARY_MUTATION = gql(/* GraphQL */ `
  mutation AssignMainBeneficiary($beneficiaryId: Int!, $proceedingId: Int!) {
    assignMainBeneficiary(
      beneficiaryId: $beneficiaryId
      proceedingId: $proceedingId
    )
  }
`)

export function useProceeding(proceedingId: number) {
  const [proceeding, setProceeding] = useState<Proceeding | undefined>(
    undefined
  )
  const { loading, error, refetch } = useQuery(GET_PROCEEDING_QUERY, {
    variables: {
      getProceedingByIdId: proceedingId,
    },
    onCompleted: (data) => {
      setProceeding(data.getProceedingById ?? undefined)
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
      .then(() => {
        setProceeding((prev) => ({
          ...prev!,
          beneficiaries: prev?.beneficiaries?.filter(
            (b) => b.id !== beneficiaryId.toString()
          ),
          mainBeneficiary:
            prev?.mainBeneficiary?.id === beneficiaryId.toString()
              ? undefined
              : prev?.mainBeneficiary,
        }))

        toaster.success({ title: 'Dědic byl odebrán.' })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se odebrat dědice.' })
      })

  const [addBeneficiariesToProceeding] = useMutation(ADD_BENEFICIARIES_MUTATION)

  const addBeneficiaries = (userIds: string[]) =>
    addBeneficiariesToProceeding({
      variables: {
        userIds: userIds.map(parseInt),
        proceedingId,
      },
    })
      .then((res) => {
        setProceeding(
          (prev) =>
            prev && {
              ...prev,
              beneficiaries: [
                ...(prev.beneficiaries ?? []),
                ...(res.data?.addBeneficiariesToProceeding ?? []),
              ],
            }
        )
        toaster.success({ title: 'Dědic byl přidán.' })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se přidat dědice.' })
      })

  const [removeMainBeneficiaryMutation] = useMutation(
    REMOVE_MAIN_BENEFICIARY_MUTATION,
    {
      variables: {
        proceedingId,
      },
    }
  )

  const removeMainBeneficiary = () =>
    removeMainBeneficiaryMutation()
      .then(() => refetch())
      .then(() => {
        toaster.success({ title: 'Kontaktní osoba byla odebrána.' })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se odebrat kontaktní osobu.' })
      })

  const [addMainBeneficiary] = useMutation(ADD_MAIN_BENEFICIARY_MUTATION)

  const assignMainBeneficiary = (beneficiaryId: number) =>
    addMainBeneficiary({
      variables: {
        beneficiaryId,
        proceedingId,
      },
    })
      .then(() => {
        setProceeding((prev) => ({
          ...prev!,
          mainBeneficiary: prev?.beneficiaries?.find(
            (b) => b.id === beneficiaryId.toString()
          ),
        }))
        toaster.success({ title: 'Kontaktní osoba byla přidána.' })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se přidat kontaktní osobu.' })
      })

  const auth = useAuth()
  const isEditable = ['Notary', 'Admin'].includes(auth.user?.type ?? 'User')

  return {
    proceeding,
    loading,
    error,
    removeBeneficiary,
    removeMainBeneficiary,
    addBeneficiaries,
    assignMainBeneficiary,
    isEditable,
  }
}

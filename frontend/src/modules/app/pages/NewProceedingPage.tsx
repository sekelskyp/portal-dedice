import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import resources from '@frontend/resources'
import { route } from '@shared/route'

import { Heir, ProceedingForm } from './ProceedingForm'

const PROCEEDING_MUTATION = gql(/* GraphQL */ `
  mutation createProcedure($data: CreateInheritanceProcedureInput!) {
    createProcedure(data: $data)
  }
`)

export function NewProceedingPage() {
  const navigate = useNavigate()

  const [createProcedureRequest, createProcedureRequestState] = useMutation(
    PROCEEDING_MUTATION,
    {
      onCompleted: (data, context) => {
        navigate(route.proceedings())
      },
      onError: () => {},
    }
  )

  const handleProceedingFormSubmit = useCallback(
    (variables: {
      data: {
        name: string
        surname: string
        dateOfBirth: string
        dateOfDeath: string
        address: string
        contactName: string
        contactSurname: string
        contactEmail: string
        heirs: Heir[]
      }
    }) => {
      createProcedureRequest({
        variables: {
          data: {
            name: variables.data.name,
            //surname: variables.data.surname,
            deceasedDateOfBirth: variables.data.dateOfBirth,
            deceasedDateOfDeath: variables.data.dateOfDeath,
            endDate: new Date().toISOString(),
            startDate: new Date().toISOString(),
            //address: variables.data.address,
            //contactName: variables.data.contactName,
            //contactSurname: variables.data.contactEmail,
            //contactEmail: variables.data.contactEmail,
            //heirs: variables.data.heirs,
          },
        },
      })
    },
    [createProcedureRequest]
  )
  return (
    <Stack gap={6}>
      <Stack>
        <Text fontSize="xl" fontWeight="bold">
          {resources.portal.pages.newProceeding.title}
        </Text>
        <Text fontSize="sm">
          {resources.portal.pages.newProceeding.subtitle}
        </Text>
      </Stack>
      <ProceedingForm onSubmit={handleProceedingFormSubmit}></ProceedingForm>
    </Stack>
  )
}

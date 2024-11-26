import { useCallback } from 'react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { useCreateProcedure } from '@frontend/modules/app/hooks/useCreateProcedure'
import { useAuth } from '@frontend/modules/auth'
import resources from '@frontend/resources'
import { Alert } from '@frontend/shared/design-system'

import { Beneficiary, ProceedingForm } from './ProceedingForm'

export function NewProceedingPage() {
  const { user } = useAuth()
  const [createProcedureRequest, createProcedureRequestState] =
    useCreateProcedure()

  const handleProceedingFormSubmit = useCallback(
    async (variables: {
      name: string
      surname: string
      dateOfBirth: string
      dateOfDeath: string
      contactName: string
      contactSurname: string
      contactEmail: string
      beneficiaries: Beneficiary[]
      addressStreet: string
      addressStreetNumber: string
      addressMunicipality: string
      addressPostCode: string
    }) => {
      createProcedureRequest({
        variables: {
          data: {
            deceasedPerson: {
              name: variables.name,
              surname: variables.surname,
              dateOfBirth: new Date(variables.dateOfBirth).toISOString(),
              dateOfDeath: new Date(variables.dateOfDeath).toISOString(),
              addressStreet: variables.addressStreet,
              addressStreetNumber: variables.addressStreetNumber,
              addressMunicipality: variables.addressMunicipality,
              addressPostCode: variables.addressPostCode,
            },
            contactPerson: {
              name: variables.contactName,
              surname: variables.contactSurname,
              email: variables.contactEmail,
            },
            beneficiaries: variables.beneficiaries,
            beneficiaryId: +user?.beneficiaries[0].id!,
          },
        },
      })
    },
    [createProcedureRequest, user]
  )

  return (
    <Card.Root>
      <Card.Header>
        <Heading size={{ base: 'xl', sm: '2xl' }}>
          {resources.portal.pages.newProceeding.title}
        </Heading>
        <Text fontSize="sm">
          {resources.portal.pages.newProceeding.subtitle}
        </Text>
      </Card.Header>
      <Card.Body>
        <ProceedingForm onSubmit={handleProceedingFormSubmit}></ProceedingForm>
        {createProcedureRequestState.error ? (
          <Alert
            status="error"
            title={createProcedureRequestState.error.message}
          />
        ) : null}
      </Card.Body>
    </Card.Root>
  )
}

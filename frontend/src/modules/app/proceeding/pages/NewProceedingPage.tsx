import { useCallback } from 'react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { useCreateProceeding } from '@frontend/modules/app/proceeding/hooks/useCreateProceeding'
import resources from '@frontend/resources'
import { Alert } from '@frontend/shared/design-system'

import { ProceedingForm } from '../components/ProceedingForm'

export function NewProceedingPage() {
  const [createProcedureRequest, createProcedureRequestState] =
    useCreateProceeding()

  const handleProceedingFormSubmit = useCallback(
    async (variables: {
      name: string
      surname: string
      dateOfBirth: string
      dateOfDeath: string
      addressInput: {
        street: string
        streetNumber: string
        municipality: string
        postalCode: string
      }
      mainBeneficiary: string
      beneficiaries: string[]
    }) => {
      await createProcedureRequest({
        variables: {
          data: {
            deceasedPerson: {
              name: variables.name,
              surname: variables.surname,
              dateOfBirth: new Date(variables.dateOfBirth).toISOString(),
              dateOfDeath: new Date(variables.dateOfDeath).toISOString(),
              addressStreet: variables.addressInput.street,
              addressStreetNumber: variables.addressInput.streetNumber,
              addressMunicipality: variables.addressInput.municipality,
              addressPostCode: variables.addressInput.postalCode,
            },
            beneficiaryUserIds: variables.beneficiaries,
            mainBeneficiaryUserId: variables.mainBeneficiary,
            startDate: new Date().toISOString(),
          },
        },
      })
    },
    [createProcedureRequest]
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

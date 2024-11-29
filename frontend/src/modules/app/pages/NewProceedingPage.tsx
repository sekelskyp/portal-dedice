import { useCallback } from 'react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { useCreateProceeding } from '@frontend/modules/app/hooks/useCreateProceeding'
import { useAuth } from '@frontend/modules/auth'
import resources from '@frontend/resources'
import { Alert } from '@frontend/shared/design-system'

import { Beneficiary, ProceedingForm } from './ProceedingForm'

export function NewProceedingPage() {
  const { user } = useAuth()
  const [createProcedureRequest, createProcedureRequestState] =
    useCreateProceeding()

  const handleProceedingFormSubmit = useCallback(
    async (variables: {
      name: string
      surname: string
      dateOfBirth: string
      dateOfDeath: string
      addressStreet: string
      addressStreetNumber: string
      addressMunicipality: string
      addressPostCode: string
      contactName: string
      contactSurname: string
      contactEmail: string
      beneficiaries: Beneficiary[]
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
            beneficiaryUserIds: variables.beneficiaries.map((ben) => ben.name),
            mainBeneficiaryUserId: user?.id ?? '0',
            startDate: new Date().toISOString(),
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

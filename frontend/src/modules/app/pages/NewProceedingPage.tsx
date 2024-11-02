import { useCallback } from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { Suggestion } from 'use-places-autocomplete'

import { useCreateProcedure } from '@frontend/modules/auth/hooks/useCreateProcedure'
import { getZipCodeFromAddress } from '@frontend/modules/wizard/utils/getGeocode'
import resources from '@frontend/resources'
import { Alert } from '@frontend/shared/design-system'

import { Beneficiary, ProceedingForm } from './ProceedingForm'

export function NewProceedingPage() {
  const [createProcedureRequest, createProcedureRequestState] =
    useCreateProcedure()

  const handleProceedingFormSubmit = useCallback(
    async (variables: {
      name: string
      surname: string
      dateOfBirth: string
      dateOfDeath: string
      address: string
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
              completeAddress: await getZipCodeFromAddress(
                (variables.address as Suggestion).zip!
              ),
            },
            contactPerson: {
              name: variables.contactName,
              surname: variables.contactSurname,
              email: variables.contactEmail,
            },
            beneficiaries: variables.beneficiaries,
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
      {createProcedureRequestState.error ? (
        <Alert
          status="error"
          title={createProcedureRequestState.error.message}
        />
      ) : null}
    </Stack>
  )
}

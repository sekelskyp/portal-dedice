import { useState } from 'react'
import { HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'

import resources from '@frontend/resources'
import {
  DateFormControl,
  Form,
  InputFormControl,
  SubmitButton,
} from '@frontend/shared/forms'

export type ProceedingFormProps = {
  errorMessage?: string
  onSubmit: (variables: {
    name: string
    surname: string
    dateOfBirth: string
    dateOfDeath: string
    address: string
    contactName: string
    contactSurname: string
    contactEmail: string
    beneficiaries: Beneficiary[]
  }) => void
}

export interface Beneficiary {
  name: string
  surname: string
  email: string
}

const emptyBeneficiary = (): Beneficiary => ({
  name: '',
  surname: '',
  email: '',
})

export function ProceedingForm({ onSubmit }: ProceedingFormProps) {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, emptyBeneficiary()])
  }

  return (
    <Form onSubmit={onSubmit}>
      <Stack gap={6}>
        <Stack gap={3}>
          <Text fontWeight="bold">
            {resources.portal.forms.proceedingForm.groups.deceased}
          </Text>
          <HStack gap={6}>
            <InputFormControl
              name="name"
              label={resources.portal.forms.proceedingForm.name}
            ></InputFormControl>
            <InputFormControl
              name="surname"
              label={resources.portal.forms.proceedingForm.surname}
            ></InputFormControl>
          </HStack>
          <DateFormControl
            name="dateOfBirth"
            label={resources.portal.forms.proceedingForm.dateOfBirth}
          ></DateFormControl>
          <DateFormControl
            name="dateOfDeath"
            label={resources.portal.forms.proceedingForm.dateOfDeath}
          ></DateFormControl>
          <InputFormControl
            name="address"
            label={resources.portal.forms.proceedingForm.address}
          ></InputFormControl>
        </Stack>
        <Stack>
          <Text fontWeight="bold">
            {resources.portal.forms.proceedingForm.groups.contactPerson}
          </Text>
          <HStack gap={6}>
            <InputFormControl
              name="contactName"
              label={resources.portal.forms.proceedingForm.name}
            ></InputFormControl>
            <InputFormControl
              name="contactSurname"
              label={resources.portal.forms.proceedingForm.surname}
            ></InputFormControl>
          </HStack>
          <InputFormControl
            name="contactEmail"
            label={resources.portal.forms.proceedingForm.email}
          ></InputFormControl>
        </Stack>
        <Stack>
          <Text fontWeight="bold">
            {resources.portal.forms.proceedingForm.groups.beneficiaries}
          </Text>
          <Stack gap={6}>
            {beneficiaries.map((beneficiary: Beneficiary, index: number) => (
              <Stack key={`beneficiary-${index}`}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                >{`Dědic ${index + 1}`}</Text>
                <HStack gap={6}>
                  <InputFormControl
                    name={`beneficiaries.${index}.name`}
                    label={resources.portal.forms.proceedingForm.name}
                  ></InputFormControl>
                  <InputFormControl
                    name={`beneficiaries.${index}.surname`}
                    label={resources.portal.forms.proceedingForm.surname}
                  ></InputFormControl>
                </HStack>
                <InputFormControl
                  name={`beneficiaries.${index}.email`}
                  label={resources.portal.forms.proceedingForm.email}
                ></InputFormControl>
              </Stack>
            ))}
          </Stack>
          <IconButton
            onClick={addBeneficiary}
            alignSelf="flex-start"
            p={4}
            my={4}
          >
            <LuPlus></LuPlus>
            {resources.portal.forms.proceedingForm.addBeneficiary}
          </IconButton>
        </Stack>
        <SubmitButton>
          {resources.portal.forms.proceedingForm.createProceeding}
        </SubmitButton>
      </Stack>
    </Form>
  )
}

import { useState } from 'react'
import { HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuPlus } from 'react-icons/lu'
import { z } from 'zod'

import resources from '@frontend/resources'
import {
  DateFormControl,
  Form,
  InputFormControl,
  SubmitButton,
} from '@frontend/shared/forms'
import { AddressFormControl } from '@frontend/shared/forms/AddressFormControl'

const benefciarySchema = z.object({
  name: z
    .string({ required_error: 'Jméno je povinné' })
    .min(1, 'Jméno je povinné'),
  surname: z
    .string({ required_error: 'Příjmení je povinné' })
    .min(1, 'Příjmení je povinné'),
  email: z
    .string({ required_error: 'Zadejte validní e-mailovou adresu' })
    .email('Zadejte validní e-mailovou adresu'),
})

const schema = z.object({
  name: z
    .string({ required_error: 'Jméno je povinné' })
    .min(1, 'Jméno je povinné'),
  surname: z
    .string({ required_error: 'Příjmení je povinné' })
    .min(1, 'Příjmení je povinné'),
  dateOfBirth: z
    .date({ required_error: 'Datum narození je povinné.' })
    .max(new Date(), 'Datum narození musí být v minulosti.'),
  dateOfDeath: z
    .date({ required_error: 'Datum narození je povinné.' })
    .max(new Date(), 'Datum narození musí být v minulosti.'),
  address: z.any({ required_error: 'Adresa bydliště je povinná.' }),
  contactName: z
    .string({ required_error: 'Jméno je povinné' })
    .min(1, 'Jméno je povinné'),
  contactSurname: z
    .string({ required_error: 'Jméno je povinné' })
    .min(1, 'Jméno je povinné'),
  contactEmail: z
    .string({ required_error: 'Zadejte validní e-mailovou adresu' })
    .email('Zadejte validní e-mailovou adresu'),
  beneficiaries: z.array(benefciarySchema),
})

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
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={6}>
        <Stack gap={3}>
          <Text fontWeight="bold">
            {resources.portal.forms.proceedingForm.groups.deceased}
          </Text>
          <HStack gap={6}>
            <InputFormControl
              name="name"
              label={resources.portal.forms.proceedingForm.name}
              required
            ></InputFormControl>
            <InputFormControl
              name="surname"
              label={resources.portal.forms.proceedingForm.surname}
              required
            ></InputFormControl>
          </HStack>
          <DateFormControl
            name="dateOfBirth"
            label={resources.portal.forms.proceedingForm.dateOfBirth}
            required
          ></DateFormControl>
          <DateFormControl
            name="dateOfDeath"
            label={resources.portal.forms.proceedingForm.dateOfDeath}
            required
          ></DateFormControl>
          <AddressFormControl
            name="address"
            label={resources.portal.forms.proceedingForm.address}
            required
          ></AddressFormControl>
        </Stack>
        <Stack>
          <Text fontWeight="bold">
            {resources.portal.forms.proceedingForm.groups.contactPerson}
          </Text>
          <HStack gap={6}>
            <InputFormControl
              name="contactName"
              label={resources.portal.forms.proceedingForm.name}
              required
            ></InputFormControl>
            <InputFormControl
              name="contactSurname"
              label={resources.portal.forms.proceedingForm.surname}
              required
            ></InputFormControl>
          </HStack>
          <InputFormControl
            name="contactEmail"
            label={resources.portal.forms.proceedingForm.email}
            required
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
                    required
                  ></InputFormControl>
                  <InputFormControl
                    name={`beneficiaries.${index}.surname`}
                    label={resources.portal.forms.proceedingForm.surname}
                    required
                  ></InputFormControl>
                </HStack>
                <InputFormControl
                  name={`beneficiaries.${index}.email`}
                  label={resources.portal.forms.proceedingForm.email}
                  required
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

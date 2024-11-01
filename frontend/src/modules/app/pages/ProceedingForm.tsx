import { useState } from 'react'
import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
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
    dateOfDeath: string
    address: string
    contactName: string
    contactSurname: string
    contactEmail: string
    heirs: Heir[]
  }) => void
}

export interface Heir {
  name: string
  surname: string
  email: string
}

const emptyHeir = (): Heir => ({
  name: '',
  surname: '',
  email: '',
})

export function ProceedingForm({ onSubmit }: ProceedingFormProps) {
  const [heirs, setHeirs] = useState<Heir[]>([])

  const addHeir = () => {
    setHeirs([...heirs, emptyHeir()])
  }

  return (
    <Form onSubmit={onSubmit}>
      <Text fontSize="xl" fontWeight="bold">
        {resources.portal.pages.newProceeding.title}
      </Text>
      <Text fontSize="sm">{resources.portal.pages.newProceeding.subtitle}</Text>
      <Text fontWeight="bold">
        {resources.portal.forms.proceedingForm.groups.deceased}
      </Text>
      <HStack gap={4}>
        <InputFormControl name="name" label="Jméno"></InputFormControl>
        <InputFormControl name="surname" label="Příjmení"></InputFormControl>
      </HStack>
      <DateFormControl name="dateOfDeath" label="Datum úmrtí"></DateFormControl>
      <InputFormControl
        name="address"
        label="Trvalé bydliště"
      ></InputFormControl>
      <Text fontWeight="bold">
        {resources.portal.forms.proceedingForm.groups.contactPerson}
      </Text>
      <HStack gap={4}>
        <InputFormControl name="contactName" label="Jméno"></InputFormControl>
        <InputFormControl
          name="contactSurname"
          label="Příjmení"
        ></InputFormControl>
      </HStack>
      <InputFormControl
        name="contactEmail"
        label="Emailová adresa"
      ></InputFormControl>
      <Text fontWeight="bold">
        {resources.portal.forms.proceedingForm.groups.heirs}
      </Text>
      {heirs.map((heir: Heir, index: number) => (
        <Box key={`heir-${index}`}>
          <HStack gap={4}>
            <InputFormControl
              name={`heirs.${index}.name`}
              label="Jméno"
            ></InputFormControl>
            <InputFormControl
              name={`heirs.${index}.surname`}
              label="Příjmení"
            ></InputFormControl>
          </HStack>
          <InputFormControl
            name={`heirs.${index}.email`}
            label="Emailová adresa"
          ></InputFormControl>
        </Box>
      ))}
      <IconButton onClick={addHeir} alignSelf="flex-start" p={4}>
        <LuPlus></LuPlus>
        {resources.portal.forms.proceedingForm.addHeir}
      </IconButton>
      <SubmitButton>
        {resources.portal.forms.proceedingForm.createProceeding}
      </SubmitButton>
    </Form>
  )
}

import { useState } from 'react'
import {
  Box,
  Button,
  Field,
  Fieldset,
  HStack,
  IconButton,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'

import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'

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
      {/*
      <Stack gap={4}>
      <Text fontSize={'lg'} as="b">
          Identifikace zůstavitele
        </Text>
        <HStack gap={4}>
          <InputFormControl name="name" label="Jméno "></InputFormControl>
          <InputFormControl name="surname" label="Příjmení "></InputFormControl>
          </HStack>
        <InputFormControl
          name="dateOfDeath"
          label="Datum úmrtí "
        ></InputFormControl>
        <InputFormControl
        name="address"
          label="Trvalé bydliště "
          ></InputFormControl>
          <Text fontSize={'lg'} as={'b'}>
          Kontaktní osoba
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
          <Text fontSize={'lg'} as={'b'}>
          Dědici po zůstaviteli
          </Text>
          {heirs.map((heir: Heir, index: number) => (
            <Stack key={`heir-${index}`} gap={4}>
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
            </Stack>
            ))}
            <IconButton onClick={addHeir}>
            <LuPlus></LuPlus>
            Přidat dědice
            </IconButton>
            <SubmitButton>Vytvořit řízení</SubmitButton>
            </Stack>
            */}
      <Fieldset.Root size="lg" maxW="2xl">
        <Stack>
          <Fieldset.Legend fontSize="xl" fontWeight="bold">
            Založení nového řízení
          </Fieldset.Legend>
          <Fieldset.HelperText fontSize="sm">
            Pro založení nového dědického řízení prosím vyplňte nasledující
            formulář.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Text fontWeight="bold">Identifikace zůstavitele</Text>
          <HStack gap={4}>
            <InputFormControl
              name="contactName"
              label="Jméno"
            ></InputFormControl>
            <InputFormControl
              name="contactSurname"
              label="Příjmení"
            ></InputFormControl>
          </HStack>
          <InputFormControl
            name="dateOfDeath"
            label="Datum úmrtí "
          ></InputFormControl>
          <InputFormControl
            name="address"
            label="Trvalé bydliště "
          ></InputFormControl>

          <Text fontWeight="bold">Kontaktní osoba</Text>
          <HStack gap={4}>
            <InputFormControl
              name="contactName"
              label="Jméno"
            ></InputFormControl>
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
          Dědici po zůstaviteli
          </Text>
          {heirs.map((heir: Heir, index: number) => (
            <Box key={`heir-${index}`} gap={4}>
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
            Přidat dědice
          </IconButton>
        </Fieldset.Content>

        <Button type="submit">
          Založit řízení
        </Button>
      </Fieldset.Root>
    </Form>
  )
}

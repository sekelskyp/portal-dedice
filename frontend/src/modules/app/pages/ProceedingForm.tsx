import { useState } from 'react'
import { Button, InputGroup, Stack, Text } from '@chakra-ui/react'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'

import { Form } from '@frontend/shared/forms/Form'

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
      <Stack gap={4}>
        <Text fontSize={'lg'} as="b">
          Identifikace zůstavitele
        </Text>
        <InputControl name="name" label="Jméno "></InputControl>
        <InputControl name="surname" label="Příjmení "></InputControl>
        <InputControl name="dateOfDeath" label="Datum úmrtí "></InputControl>
        <InputControl name="address" label="Trvalé bydliště "></InputControl>
        <Text fontSize={'lg'} as={'b'}>
          Kontaktní osoba
        </Text>
        <InputControl name="contactName" label="Jméno"></InputControl>
        <InputControl name="contactSurname" label="Příjmení"></InputControl>
        <InputControl
          name="contactEmail"
          label="Emailová adresa"
        ></InputControl>
        <Text fontSize={'lg'} as={'b'}>
          Dědici po zůstaviteli
        </Text>
        {heirs.map((heir: Heir, index: number) => (
          <InputGroup key={`heir-${index}`}>
            <InputControl
              name={`heirs.${index}.name`}
              label="Jméno"
            ></InputControl>
          </InputGroup>
        ))}
        <Button onClick={addHeir}>Přidat dědice</Button>
        <SubmitButton>Vytvořit řízení</SubmitButton>
      </Stack>
    </Form>
  )
}

import { Container, Heading, Spacer, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputControl,
  SelectControl,
  SubmitButton,
} from 'react-hook-form-chakra'
import { z } from 'zod'

import { Form } from '../../../shared/forms/Form'
import { passwordSchema } from '../passwordSchema'

const schema = z
  .object({
    email: z.string().email('Zadejte validní emailovou adresu'),
    gender: z.string().min(1, 'Pohlaví je povinné'),
    name: z.string().min(1, 'Jméno je povinné'),
    surname: z.string().min(1, 'Příjmení je povinné'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hesla se neshodují',
        path: ['confirmPassword'],
      })
    }
  })

export type SignUpFormProps = {
  errorMessage?: string
  onSubmit: (data: {
    email: string
    gender: string
    name: string
    surname: string
    password: string
  }) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Container p={0}>
        <Stack gap={5}>
          <Heading as="h2">Registrace</Heading>
          <InputControl name="name" label="Jméno" isRequired></InputControl>
          <InputControl
            name="surname"
            label="Příjmení"
            isRequired
          ></InputControl>
          <SelectControl
            name="gender"
            label="Pohlaví"
            selectProps={{ placeholder: 'Zvolte pohlaví' }}
          >
            <option value="male">Muž</option>
            <option value="female">Žena</option>
          </SelectControl>
          <InputControl
            name="email"
            label="Emailová adresa"
            isRequired
          ></InputControl>
          <InputControl
            name="password"
            label="Heslo"
            inputProps={{ type: 'password' }}
            isRequired
          ></InputControl>
          <InputControl
            name="confirmPassword"
            label="Potvrdit heslo"
            inputProps={{ type: 'password' }}
            isRequired
          ></InputControl>
          <Spacer></Spacer>
          <SubmitButton>Vytvořit účet</SubmitButton>
        </Stack>
      </Container>
    </Form>
  )
}

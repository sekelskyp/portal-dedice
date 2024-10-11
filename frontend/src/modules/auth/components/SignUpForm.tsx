import { Flex, Heading, Spacer } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { z } from 'zod'

import { Form } from '../../../shared/forms/Form'
import { passwordSchema } from '../passwordSchema'

const schema = z
  .object({
    firstName: z.string().min(1, 'Jméno je povinné'),
    lastName: z.string().min(1, 'Příjmení je povinné'),
    userName: z.string().min(1, 'Přezdívka je povinná'),
    email: z.string().email('Zadejte validní emailovou adresu'),
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
    firstName: string
    lastName: string
    name: string
    email: string
    password: string
  }) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Flex direction={'column'} textAlign={'center'} gap={5}>
        <Heading as="h2">Registrace</Heading>
        <InputControl name="firstName" label="Jméno" isRequired></InputControl>
        <InputControl
          name="lastName"
          label="Příjmení"
          isRequired
        ></InputControl>
        <InputControl name="name" label="Přezdívka" isRequired></InputControl>
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
      </Flex>
    </Form>
  )
}

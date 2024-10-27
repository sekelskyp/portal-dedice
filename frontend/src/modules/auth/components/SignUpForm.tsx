import { Box, Spacer, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { z } from 'zod'

import resources from '@frontend/resources'

import { Form } from '../../../shared/forms/Form'
import { passwordSchema } from '../passwordSchema'

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    contact: z.object({
      gender: z.string().min(1, 'Pohlaví je povinné'),
      email: z.string().email('Zadejte validní emailovou adresu'),
      name: z.string().min(1, 'Jméno je povinné'),
      surname: z.string().min(1, 'Příjmení je povinné'),
    }),
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
    contact: {
      email: string
      gender: string
      name: string
      surname: string
      dateOfBirth: string
      country: string
      city: string
      street: string
      postalCode: string
      phone: string
    }
    password: string
  }) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <InputControl
          name="contact.name"
          label={resources.auth.forms.signUp.name}
          isRequired
        ></InputControl>
        <InputControl
          name="contact.surname"
          label={resources.auth.forms.signUp.surname}
          isRequired
        ></InputControl>
        <InputControl
          name="contact.email"
          label={resources.auth.forms.shared.email.label}
          inputProps={{
            placeholder: resources.auth.forms.shared.email.placeholder,
          }}
          isRequired
        ></InputControl>
        <InputControl
          name="password"
          label={resources.auth.forms.shared.password}
          inputProps={{ type: 'password' }}
          isRequired
        ></InputControl>
        <InputControl
          name="confirmPassword"
          label={resources.auth.forms.signUp.confirmPassword}
          inputProps={{ type: 'password' }}
          isRequired
        ></InputControl>
        <Spacer></Spacer>
        <Box textAlign="center">
          <SubmitButton width="fit-content">Vytvořit účet</SubmitButton>
        </Box>
      </Stack>
    </Form>
  )
}

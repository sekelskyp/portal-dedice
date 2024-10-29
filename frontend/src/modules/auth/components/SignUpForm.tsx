import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import resources from '@frontend/resources'
import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'

import { passwordSchema } from '../passwordSchema'

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    email: z
      .string({ required_error: 'Zadejte validní e-mailovou adresu' })
      .email('Zadejte validní e-mailovou adresu'),
    name: z
      .string({ required_error: 'Jméno je povinné' })
      .min(1, 'Jméno je povinné'),
    surname: z
      .string({ required_error: 'Příjmení je povinné' })
      .min(1, 'Příjmení je povinné'),
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
    name: string
    surname: string
    password: string
  }) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <InputFormControl
          name="name"
          label={resources.auth.forms.signUp.name}
          required
        />
        <InputFormControl
          name="surname"
          label={resources.auth.forms.signUp.surname}
          required
        />
        <InputFormControl
          name="email"
          label={resources.auth.forms.shared.email.label}
          placeholder={resources.auth.forms.shared.email.placeholder}
          required
        />
        <InputFormControl
          name="password"
          label={resources.auth.forms.shared.password}
          type="password"
          required
        />
        <InputFormControl
          name="confirmPassword"
          label={resources.auth.forms.signUp.confirmPassword}
          type="password"
          required
        />
        <SubmitButton>Vytvořit účet</SubmitButton>
      </Stack>
    </Form>
  )
}

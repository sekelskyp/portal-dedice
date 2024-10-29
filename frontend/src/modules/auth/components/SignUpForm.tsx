import { createListCollection, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import resources from '@frontend/resources'
import {
  Form,
  InputFormControl,
  SelectFormControl,
  SubmitButton,
} from '@frontend/shared/forms'

import { passwordSchema } from '../passwordSchema'

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    contact: z.object({
      gender: z
        .string({ required_error: 'Pohlaví je povinné' })
        .min(1, 'Pohlaví je povinné'),
      email: z
        .string({ required_error: 'Zadejte validní e-mailovou adresu' })
        .email('Zadejte validní e-mailovou adresu'),
      name: z
        .string({ required_error: 'Jméno je povinné' })
        .min(1, 'Jméno je povinné'),
      surname: z
        .string({ required_error: 'Příjmení je povinné' })
        .min(1, 'Příjmení je povinné'),
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

const genderListCollection = createListCollection({
  items: [
    {
      label: resources.auth.forms.signUp.gender.values.male,
      value: 'male',
    },
    {
      label: resources.auth.forms.signUp.gender.values.female,
      value: 'female',
    },
  ],
})

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <InputFormControl
          name="contact.name"
          label={resources.auth.forms.signUp.name}
          required
        />
        <InputFormControl
          name="contact.surname"
          label={resources.auth.forms.signUp.surname}
          required
        />
        <SelectFormControl
          name="contact.gender"
          label={resources.auth.forms.signUp.gender.label}
          required
          collection={genderListCollection}
        />
        <InputFormControl
          name="contact.email"
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

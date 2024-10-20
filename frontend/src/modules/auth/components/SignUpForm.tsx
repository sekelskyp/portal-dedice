import { Spacer, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputControl,
  SelectControl,
  SubmitButton,
} from 'react-hook-form-chakra'
import { z } from 'zod'

import resources from '@frontend/resources'

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
      <Stack gap={4}>
        <InputControl
          name="name"
          label={resources.auth.forms.signUp.name}
          isRequired
        ></InputControl>
        <InputControl
          name="surname"
          label={resources.auth.forms.signUp.surname}
          isRequired
        ></InputControl>
        <SelectControl
          name="gender"
          label={resources.auth.forms.signUp.gender.label}
          selectProps={{
            placeholder: resources.auth.forms.signUp.gender.placeholder,
          }}
        >
          <option value="male">
            {resources.auth.forms.signUp.gender.values.male}
          </option>
          <option value="female">
            {resources.auth.forms.signUp.gender.values.female}
          </option>
        </SelectControl>
        <InputControl
          name="email"
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
        <SubmitButton>Vytvořit účet</SubmitButton>
      </Stack>
    </Form>
  )
}

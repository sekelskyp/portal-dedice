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
    password: passwordSchema,
    confirmPassword: z.string(),
    contact: z.object({
      gender: z.string().min(1, 'Pohlaví je povinné'),
      email: z.string().email('Zadejte validní emailovou adresu'),
      name: z.string().min(1, 'Jméno je povinné'),
      surname: z.string().min(1, 'Příjmení je povinné'),
      dateOfBirth: z.string(),
      country: z.string().min(1, 'Země je povinná'),
      city: z.string().min(1, 'Město je povinné'),
      street: z.string().min(1, 'Ulice je povinná'),
      postalCode: z.string().min(1, 'PSČ je povinné'),
      phone: z.string().optional(),
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
          name="contact.dateOfBirth"
          label={resources.auth.forms.signUp.dateOfBirth}
          inputProps={{
            type: 'datetime-local',
          }}
          isRequired
        ></InputControl>
        <SelectControl
          name="contact.gender"
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
          name="contact.email"
          label={resources.auth.forms.shared.email.label}
          inputProps={{
            placeholder: resources.auth.forms.shared.email.placeholder,
          }}
          isRequired
        ></InputControl>
        <InputControl
          name="contact.phone"
          label="Telefon"
          inputProps={{
            placeholder: 'Telefonní číslo',
          }}
        ></InputControl>
        <InputControl
          name="contact.country"
          label={resources.auth.forms.signUp.country}
          isRequired
        />
        <InputControl
          name="contact.city"
          label={resources.auth.forms.signUp.city}
          isRequired
        />
        <InputControl
          name="contact.street"
          label={resources.auth.forms.signUp.street}
          isRequired
        />
        <InputControl
          name="contact.postalCode"
          label={resources.auth.forms.signUp.postalCode}
          isRequired
        />
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

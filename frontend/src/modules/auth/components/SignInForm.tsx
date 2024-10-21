import { Spacer, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { z } from 'zod'

import resources from '@frontend/resources'

import { Form } from '../../../shared/forms/Form'

const schema = z.object({
  email: z.string().email('Zadejte validní emailovou adresu'),
  password: z.string().min(1, 'Zadejte heslo'),
})

export type SignInFormProps = {
  error?: Error
  onSubmit: (data: { email: string; password: string }) => void
}

export function SignInForm({ onSubmit, error }: SignInFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <InputControl
          name="email"
          label={resources.auth.forms.shared.email.label}
          inputProps={{
            placeholder: resources.auth.forms.shared.email.placeholder,
          }}
          isRequired
        />
        <InputControl
          name="password"
          label={resources.auth.forms.shared.password}
          inputProps={{ type: 'password' }}
          isRequired
        />
        <Spacer />
        <SubmitButton>{resources.shared.CTA.signIn}</SubmitButton>
      </Stack>
    </Form>
  )
}

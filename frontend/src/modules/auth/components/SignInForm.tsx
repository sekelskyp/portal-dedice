import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import resources from '@frontend/resources'
import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'

const schema = z.object({
  email: z
    .string({ required_error: 'Zadejte e-mailovou adresu.' })
    .min(1, 'Zadejte validní e-mailovou adresu.'),
  password: z
    .string({ required_error: 'Zadejte heslo.' })
    .min(1, 'Zadejte heslo.'),
})

export type SignInFormProps = {
  error?: Error
  onSubmit: (data: { email: string; password: string }) => void
}

export function SignInForm({ onSubmit, error }: SignInFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <InputFormControl
          name="email"
          label={resources.auth.forms.shared.email.label}
          required
        />
        <InputFormControl
          name="password"
          type="password"
          label={resources.auth.forms.shared.password}
          required
        />
        <SubmitButton>{resources.shared.CTA.signIn}</SubmitButton>
      </Stack>
    </Form>
  )
}

import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, PasswordFormControl, SubmitButton } from '@frontend/shared/forms'

import { passwordSchema } from '../passwordSchema'

const schema = z.object({
  newPassword: passwordSchema,
  confirmPassword: z.string({
    required_error: 'Potvrzení hesla je povinné.',
  }),
})

export type PasswordChangeFormProps = {
  onSubmit: (data: { newPassword: string }) => void
  loading?: boolean
}

export function PasswordChangeForm({
  onSubmit,
  loading,
}: PasswordChangeFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <PasswordFormControl name="newPassword" label="Nové heslo" required />
        <PasswordFormControl
          name="confirmPassword"
          label="Potvrdit nové heslo"
          required
        />
        <SubmitButton loading={loading} loadingText="Probíhá změna hesla...">
          Změnit heslo
        </SubmitButton>
      </Stack>
    </Form>
  )
}

import { MutationResult } from '@apollo/client'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Form, SubmitButton } from '@components/form'
import { PasswordFormControl } from '@components/form/password-form-control'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordMutation } from '@src/gql/graphql'
import { passwordSchema } from '@src/modules/auth/passwordSchema'
import { z } from 'zod'

const schema = z
  .object({
    newPassword: passwordSchema,
    oldPassword: z.string({ required_error: 'Staré heslo je povinné.' }),
    confirmPassword: z.string({
      required_error: 'Potvrzení hesla je povinné.',
    }),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hesla se neshodují.',
        path: ['confirmPassword'],
      })
    }
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'Nové heslo nesmí být stejné jako staré heslo',
    path: ['newPassword'],
  })

export function SettingsForm({
  onSubmit,
  requestState,
}: {
  onSubmit: (variables: { newPassword: string; oldPassword: string }) => void
  requestState: MutationResult<ChangePasswordMutation>
}) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack gap={4}>
        <Heading size="lg">Změna hesla</Heading>
        <Text color="gray" fontSize="sm">
          V nastavení si lze změnit své heslo.
        </Text>
        <PasswordFormControl name="oldPassword" label="Staré heslo" required />
        <PasswordFormControl name="newPassword" label="Nové heslo" required />
        <PasswordFormControl
          name="confirmPassword"
          label="Potvrdit nové heslo"
          required
        />
        <SubmitButton
          alignSelf="end"
          loading={requestState.loading}
          loadingText="Zpracování..."
        >
          Změnit heslo
        </SubmitButton>
      </Stack>
    </Form>
  )
}

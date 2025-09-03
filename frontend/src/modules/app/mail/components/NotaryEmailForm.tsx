import { MutationResult } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import {
  Form,
  InputFormControl,
  SubmitButton,
  TextAreaFormControl,
} from '@components/form'
import { Alert } from '@components/ui'
import { RouterNavLink } from '@components/ui/router-nav-link'
import { zodResolver } from '@hookform/resolvers/zod'
import { route } from '@lib/route'
import { NotifyProcedureBeneficiariesMutation } from '@src/gql/graphql'
import { FaTrash } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { z } from 'zod'

const schema = z.object({
  subject: z
    .string({ required_error: 'Předmět je povinný.' })
    .min(1, 'Předmět je povinný.'),
  html: z
    .string({ required_error: 'Text zprávy je povinný.' })
    .min(1, 'Text zprávy je povinný.'),
})

export type NotaryEmailFormProps = {
  onSubmit: (variables: { subject: string; html: string }) => void
  procedureId: number
  requestState: MutationResult<NotifyProcedureBeneficiariesMutation>
}

export function NotaryEmailForm({
  onSubmit,
  procedureId,
  requestState,
}: NotaryEmailFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack width="1/2" py={2}>
        <InputFormControl name="subject" label="Předmět zprávy" required />
      </Stack>
      <Stack py={2}>
        <TextAreaFormControl
          name="html"
          label="Text zprávy"
          placeholder="Text e-mailu..."
          height="150px"
          size="md"
          required
        />
      </Stack>
      <Stack
        direction="row"
        my={4}
        justifyContent={{ base: 'center', md: 'start' }}
      >
        <RouterNavLink
          to={route.proceeding(procedureId.toString())}
          bg="gray.500"
          _hover={{ bg: 'gray.700' }}
        >
          Zahodit <FaTrash />
        </RouterNavLink>
        <SubmitButton
          loading={requestState.loading}
          loadingText="E-mail se odesílá..."
        >
          Odeslat e-mail <FiSend />
        </SubmitButton>
      </Stack>
      {requestState.error && (
        <Alert status="error" title={requestState.error.message} />
      )}
    </Form>
  )
}

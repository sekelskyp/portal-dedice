import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaTrash } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { z } from 'zod'

import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'
import { TextAreaFormControl } from '@frontend/shared/forms/TextAreaFormControl'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

const schema = z.object({
  subject: z
    .string({ required_error: 'Předmět je povinný.' })
    .min(1, 'Předmět je povinný'),
  content: z
    .string({ required_error: 'Obsah je povinný.' })
    .min(1, 'Obsah je povinný'),
})

export type NotaryEmailFormProps = {
  onSubmit: (variables: { subject: string; content: string }) => void
  procedureId: number
}

export function NotaryEmailForm({
  onSubmit,
  procedureId,
}: NotaryEmailFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Stack width="1/2" py={2}>
        <InputFormControl name="subject" label="Předmět" required />
      </Stack>
      <Stack py={2}>
        <TextAreaFormControl
          name="content"
          label="Obsah"
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
          to={route.inheritanceProcedure(procedureId.toString())}
          bg="gray.500"
          _hover={{ bg: 'gray.700' }}
        >
          Zahodit <FaTrash />
        </RouterNavLink>
        <SubmitButton>
          Odeslat e-mail <FiSend />
        </SubmitButton>
      </Stack>
    </Form>
  )
}

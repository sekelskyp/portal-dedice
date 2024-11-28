import { HStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'

const schema = z.object({
  message: z
    .string({ required_error: 'Zadejte zprávu' })
    .min(1, 'Zadejte zprávu'),
})

interface ChatInputProps {
  errorMessage?: string
  onSubmit: (data: { message: string }) => void
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      defaultValues={{ message: '' }}
      noValidate
    >
      <HStack align="flex-start">
        <InputFormControl
          name="message"
          placeholder="Napište zprávu..."
        ></InputFormControl>
        <SubmitButton>Odeslat</SubmitButton>
      </HStack>
    </Form>
  )
}

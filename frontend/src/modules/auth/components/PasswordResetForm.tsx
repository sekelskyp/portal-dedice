import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'

const schema = z.object({
  email: z.string().email('Zadejte validní emailovou adresu'),
})

export type PasswordResetFormProps = {
  onSubmit: (data: { email: string }) => void
}

export function PasswordResetForm({ onSubmit }: PasswordResetFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Container p={0}>
        <Stack gap={6}>
          <Heading as="h2" size={'2xl'}>
            Zapomněli jste heslo?
          </Heading>
          <Text>
            Zadejte emailovou adresu, kterou jste použili pro vytvoření účtu a
            my Vám na ní zašleme odkaz na obnovení hesla.
          </Text>
          <InputFormControl name="email" label="E-mail" required />
          <SubmitButton>Zaslat odkaz</SubmitButton>
        </Stack>
      </Container>
    </Form>
  )
}

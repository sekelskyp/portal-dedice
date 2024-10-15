import { Container, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { z } from 'zod'

import { route } from '@frontend/route'
import { RouterLink } from '@frontend/shared/navigation/atoms/RouterLink'

import { Form } from '../../../shared/forms/Form'
import { passwordSchema } from '../passwordSchema'

const schema = z.object({
  email: z.string().email('Zadejte validní emailovou adresu'),
  password: passwordSchema,
})

export type SignInFormProps = {
  onSubmit: (data: { email: string; password: string }) => void
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Container p={0}>
        <Stack gap={4}>
          <Heading as="h2" size={'2xl'}>
            Přihlášení
          </Heading>
          <InputControl
            name="email"
            label="Emailová adresa"
            isRequired
          ></InputControl>
          <InputControl
            name="password"
            label="Heslo"
            inputProps={{ type: 'password' }}
            isRequired
          ></InputControl>
          <Spacer></Spacer>
          <SubmitButton>Přihlasit se</SubmitButton>
          <Spacer></Spacer>
          <Text as="b">Nemáte účet?</Text>
          <RouterLink to={route.home()}>Zaregistrujte se</RouterLink>
        </Stack>
      </Container>
    </Form>
  )
}

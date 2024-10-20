import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { z } from 'zod'

import { route } from '@frontend/route'
import { RouterLink } from '@frontend/shared/navigation/atoms/RouterLink'

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
      <Container p={0}>
        <Stack gap={4}>
          <Heading as="h3" size={'h3'}>
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
          {error ? <Box color="red.500">{error.message}</Box> : null}
          <SubmitButton>Přihlasit se</SubmitButton>
          <Spacer></Spacer>
          <Flex gap={2}>
            <Text as="b">Nemáte účet?</Text>
            <RouterLink to={route.signUp()}>Zaregistrujte se</RouterLink>
          </Flex>
          <RouterLink to={route.resetPassword()}>
            Zapomněli jste heslo?
          </RouterLink>
        </Stack>
      </Container>
    </Form>
  )
}

import { useMutation } from '@apollo/client'
import { Button, Container, Heading, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Box, Flex, Spacer } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

import { passwordSchema } from '../passwordSchema'

const schema = z.object({
  email: z.string().email('Zadejte validní emailovou adresu'),
  password: passwordSchema,
})

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`)

export function SignInPage() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user })
      navigate('/')
    },
    onError: () => {},
  })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const onSubmit = (data: z.infer<typeof schema>) => {
    signInRequest({
      variables: {
        email: data.email,
        password: data.password,
      },
    })
  }

  return (
    <Page>
      <FormProvider {...methods}>
        <Container p={0}>
          <Flex
            direction={'column'}
            textAlign={'center'}
            gap={5}
            as="form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Heading as="h2" my={4}>
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
            <Text>nebo</Text>
            <SubmitButton isDisabled={true}>BankID</SubmitButton>
            <SubmitButton isDisabled={true}>Jednorazová SMS</SubmitButton>
            <Text>nebo</Text>
            <Button onClick={() => navigate('/auth/signup')}>
              Zaregistrujte se
            </Button>
          </Flex>
        </Container>
      </FormProvider>
      {signInRequestState.error ? (
        <Box color="red">{signInRequestState.error.message}</Box>
      ) : null}
    </Page>
  )
}

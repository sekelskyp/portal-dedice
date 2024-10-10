import { useMutation } from '@apollo/client'
import { Container, Heading, useDisclosure } from '@chakra-ui/react'
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
import { SignUpModal } from '../SignUpModal'

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`)

const schema = z
  .object({
    firstName: z.string().min(1, 'Jméno je povinné'),
    lastName: z.string().min(1, 'Příjmení je povinné'),
    userName: z.string().min(1, 'Přezdívka je povinná'),
    email: z.string().email('Zadejte validní emailovou adresu'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hesla se neshodují',
        path: ['confirmPassword'],
      })
    }
  })

export function SignUpPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [signUpRequest, signUpRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
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
    signUpRequest({
      variables: {
        name: data.userName,
        email: data.email,
        password: data.password,
      },
    })
    onOpen()
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Page>
      <FormProvider {...methods}>
        <Container>
          <Flex
            direction={'column'}
            textAlign={'center'}
            gap={5}
            as="form"
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
          >
            <Heading as="h2" my={4}>
              Registrace
            </Heading>
            <InputControl
              name="firstName"
              label="Jméno"
              isRequired
            ></InputControl>
            <InputControl
              name="lastName"
              label="Příjmení"
              isRequired
            ></InputControl>
            <InputControl
              name="userName"
              label="Přezdívka"
              isRequired
            ></InputControl>
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
            <InputControl
              name="confirmPassword"
              label="Potvrdit heslo"
              inputProps={{ type: 'password' }}
              isRequired
            ></InputControl>
            <Spacer></Spacer>
            <SubmitButton>Vytvořit účet</SubmitButton>
          </Flex>
        </Container>
      </FormProvider>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
      {signUpRequestState.error ? (
        <Box color="red">{signUpRequestState.error.message}</Box>
      ) : null}
    </Page>
  )
}

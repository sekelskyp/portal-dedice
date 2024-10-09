import { useMutation } from '@apollo/client'
import { Container, Heading } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Box, Flex, Spacer } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

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

const passwordSchema = z
  .string()
  .min(1, { message: 'Heslo je povinné' })
  .min(8, { message: 'Heslo musí mít alespoň 8 znaků' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Heslo musí obsahovat alespoň jedno velké písmeno',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Heslo musí obsahovat alespoň jedno malé písmeno',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Heslo musí obsahovat alespoň jedno velké písmeno',
  })

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
        message: 'Hesla jse nezhodují',
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
  }

  return (
    <Page>
      <FormProvider {...methods}>
        <Container maxW={'container.md'}>
          <Flex
            direction={'column'}
            gap={5}
            as="form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Heading>Registrace</Heading>
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
      {signUpRequestState.error ? (
        <Box color="red">{signUpRequestState.error.message}</Box>
      ) : null}
    </Page>
  )
}

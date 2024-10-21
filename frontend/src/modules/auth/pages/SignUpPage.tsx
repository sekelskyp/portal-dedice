import { useCallback } from 'react'
import {
  Alert,
  AlertIcon,
  Container,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react'

import resources from '@frontend/resources'
import { Page } from '@frontend/shared/layout'

import { SignUpForm } from '../components/SignUpForm'
import { useSignUp } from '../hooks/useSignUp'

export function SignUpPage() {
  const [signUpRequest, signUpRequestState] = useSignUp()
  const toast = useToast()

  const handleSignUpFormSubmit = useCallback(
    (variables: {
      contact: {
        email: string
        gender: string
        name: string
        surname: string
        dateOfBirth: string
        country: string
        city: string
        street: string
        postalCode: string
        phone: string
      }
      password: string
    }) => {
      signUpRequest({
        variables: {
          registerInput: {
            login: variables.contact.email,
            contact: {
              ...variables.contact,
              dateOfBirth: new Date(
                variables.contact.dateOfBirth
              ).toISOString(),
            },
            password: variables.password,
          },
        },
      })
        .then(() =>
          toast({
            title: resources.auth.pages.signUp.emailConfirmation.title,
            description: resources.auth.pages.signUp.emailConfirmation.desc,
            status: 'loading',
            duration: 10000,
            position: 'top',
            isClosable: false,
          })
        )
        .catch(() => {
          toast({
            title: resources.auth.pages.signUp.failed.title,
            description: resources.auth.pages.signUp.failed.desc,
            status: 'error',
            duration: 10000,
            position: 'top',
            isClosable: true,
          })
        })
    },
    [signUpRequest, toast]
  )

  return (
    <Page>
      <Container as={Stack} gap={4}>
        <Heading as="h2" size={'2xl'}>
          {resources.auth.pages.signUp.title}
        </Heading>
        {signUpRequestState.error ? (
          <Alert status="error">
            <AlertIcon />
            {signUpRequestState.error.message}
          </Alert>
        ) : null}
        <SignUpForm onSubmit={handleSignUpFormSubmit}></SignUpForm>
      </Container>
    </Page>
  )
}

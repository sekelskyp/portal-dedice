import { useCallback } from 'react'
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

import resources from '@frontend/resources'
import { Alert, toaster } from '@frontend/shared/design-system'

import { SignUpForm } from '../components/SignUpForm'
import { useSignUp } from '../hooks/useSignUp'

export function SignUpPage() {
  const [signUpRequest, signUpRequestState] = useSignUp()

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
          toaster.loading({
            title: resources.auth.pages.signUp.emailConfirmation.title,
            description: resources.auth.pages.signUp.emailConfirmation.desc,
            duration: 10000,
          })
        )
        .catch(() => {
          toaster.error({
            title: resources.auth.pages.signUp.failed.title,
            description: resources.auth.pages.signUp.failed.desc,
            duration: 10000,
          })
        })
    },
    [signUpRequest]
  )

  return (
    <Container px={8} py={{ base: 8, sm: 16, lg: 24 }}>
      {signUpRequestState.error ? (
        <Alert status="error" title={signUpRequestState.error.message} />
      ) : null}
      <Flex
        alignItems="center"
        direction={{
          base: 'column',
          lg: 'row',
        }}
        gap={{
          base: 0,
          lg: 24,
          xl: 40,
        }}
      >
        <Box
          flex={{ base: 1, lg: 7 }}
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          <Heading
            mb={4}
            fontSize={{
              base: '2xl',
              sm: '3xl',
              md: '4xl',
            }}
            fontWeight="bold"
            lineHeight={{
              base: 'shorter',
              md: 'none',
            }}
            letterSpacing={{
              base: 'normal',
              md: 'tight',
            }}
          >
            Potřebujete vyřešit předběžné řízení?
          </Heading>
          <Text
            mb={{
              base: 8,
              md: 4,
            }}
            fontSize={{
              base: 'md',
              sm: 'lg',
              md: 'xl',
            }}
            fontWeight="thin"
            color="gray.500"
            letterSpacing="wider"
          >
            Tato aplikace vám srozumitelně vysvětlí, co vás v pozůstalostním
            řízení čeká. V aplikaci se po zaregistrování můžete spojit s notářem
            a část pozůstalostního řízení vyřešit pohodlně online.
          </Text>
        </Box>
        <Box flex={{ base: 1, lg: 4 }} w={'full'}>
          <Box rounded="xl">
            <Heading size="3xl" as="h4" textAlign="center" mb={6}>
              Registrace
            </Heading>
            <SignUpForm onSubmit={handleSignUpFormSubmit}></SignUpForm>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}

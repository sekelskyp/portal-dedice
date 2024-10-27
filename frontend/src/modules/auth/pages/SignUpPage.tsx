import { useCallback } from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react'

import resources from '@frontend/resources'

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
    <Box px={8} py={{ base: 8, sm: 16, lg: 24 }} mx={{ base: 0, xl: 8 }}>
      {signUpRequestState.error ? (
        <Alert status="error">
          <AlertIcon />
          {signUpRequestState.error.message}
        </Alert>
      ) : null}
      <SimpleGrid
        alignItems="center"
        w={{
          base: 'full',
          xl: 9 / 12,
        }}
        columns={{
          base: 1,
          lg: 11,
        }}
        gap={{
          base: 0,
          lg: 24,
        }}
        mx="auto"
      >
        <GridItem
          colSpan={{
            base: 'auto',
            lg: 7,
          }}
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
            color="gray.900"
            _dark={{
              color: 'gray.200',
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
        </GridItem>
        <GridItem
          colSpan={{
            base: 'auto',
            md: 4,
          }}
        >
          <Box rounded="xl">
            <Center
              pb={0}
              color="gray.700"
              _dark={{
                color: 'gray.600',
              }}
            >
              <Heading size="h4" as="h4">
                Registrace
              </Heading>
            </Center>
            <SignUpForm onSubmit={handleSignUpFormSubmit}></SignUpForm>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

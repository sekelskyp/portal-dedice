import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

import { SignUpForm } from '../components/SignUpForm'
import { SignUpModal } from '../components/SignUpModal'

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      name: $name
      email: $email
      password: $password
    ) {
      user {
        id
        name
        email
      }
      token
    }
  }
`)

export function SignUpPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [signUpRequest, signUpRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      auth.signIn({ token, user })
      navigate('/')
      onOpen()
    },
    onError: () => {},
  })

  const handleSignUpFormSubmit = useCallback(
    (variables: {
      firstName: string
      lastName: string
      name: string
      email: string
      password: string
    }) => {
      signUpRequest({ variables })
    },
    [signUpRequest]
  )

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Page>
      <SignUpForm onSubmit={handleSignUpFormSubmit}></SignUpForm>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
      {signUpRequestState.error ? (
        <Box color="red">{signUpRequestState.error.message}</Box>
      ) : null}
    </Page>
  )
}

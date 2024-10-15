import { useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

import { Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

import { SignUpForm } from '../components/SignUpForm'
import { useSignUp } from '../hooks/useSignUp'

export function SignUpPage() {
  const [signUpRequest, signUpRequestState] = useSignUp()
  const toast = useToast()

  const handleSignUpFormSubmit = useCallback(
    (variables: {
      email: string
      gender: string
      name: string
      surname: string
      password: string
    }) => {
      signUpRequest({ variables })
        .then(() =>
          toast({
            title: 'Verifikace emailové adresy',
            description:
              'Pro dokončení registrace prosím klikněte na odkaz, který jsme Vám zaslali mailem',
            status: 'loading',
            duration: 10000,
            position: 'top',
            isClosable: false,
          })
        )
        .catch((error) => {
          toast({
            title: 'Verifikace zlyhala',
            description: error.message,
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
      <SignUpForm onSubmit={handleSignUpFormSubmit}></SignUpForm>
      {signUpRequestState.error ? (
        <Box color="red">{signUpRequestState.error.message}</Box>
      ) : null}
    </Page>
  )
}

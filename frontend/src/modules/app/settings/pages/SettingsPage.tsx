import { Card, Heading } from '@chakra-ui/react'

import { SettingsForm } from '../components/SettingsForm'
import { useChangePassword } from '../hooks/useChangePassword'

export function SettingsPage() {
  const [changePasswordRequest, changePasswordRequestState] =
    useChangePassword()

  const onSubmit = (variables: {
    newPassword: string
    oldPassword: string
  }) => {
    changePasswordRequest({
      variables: {
        newPassword: variables.newPassword,
        oldPassword: variables.oldPassword,
      },
    })
  }

  return (
    <Card.Root variant="subtle">
      <Card.Header>
        <Heading size={{ base: 'xl', sm: '2xl' }}>Nastavení</Heading>
      </Card.Header>
      <Card.Body>
        <SettingsForm
          onSubmit={onSubmit}
          requestState={changePasswordRequestState}
        />
      </Card.Body>
    </Card.Root>
  )
}

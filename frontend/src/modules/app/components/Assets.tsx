import { Heading, Stack } from '@chakra-ui/react'
import { FaCalculator } from 'react-icons/fa'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

export function Assets({ id }: { id: string }) {
  const { user } = useAuth()

  return (
    <Stack>
      <Heading>Majetek v řízení</Heading>
      {!user?.isNotary && (
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="center"
        >
          {' '}
          <RouterNavLink
            to={route.newAsset(id)}
            width="fit-content"
            rounded={'full'}
          >
            Přidat/upravit Majetek
            <FaCalculator />
          </RouterNavLink>
        </Stack>
      )}
    </Stack>
  )
}

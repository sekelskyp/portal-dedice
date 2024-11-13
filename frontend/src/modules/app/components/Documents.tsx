import { Heading, Stack } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

export function Documents({ id }: { id: string }) {
  const { user } = useAuth()

  return (
    <Stack>
      <Heading>Dokumenty v řízení</Heading>
      {!user?.isNotary && (
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="center"
        >
          {' '}
          <RouterNavLink
            to={route.newDocument(id)}
            rounded="full"
            width="fit-content"
          >
            Přiložit přílohu
            <FaCloudUploadAlt />
          </RouterNavLink>
        </Stack>
      )}
    </Stack>
  )
}

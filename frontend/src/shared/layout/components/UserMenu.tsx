import { HStack, Icon, Stack, Text, useBreakpoint } from '@chakra-ui/react'
import { LuArchive, LuChevronDown, LuLogOut } from 'react-icons/lu'

import { useAuth } from '@frontend/modules/auth'
import {
  Avatar,
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@frontend/shared/design-system'
import { RouterMenuItem } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

export const UserMenu = () => {
  const { user, signOut } = useAuth()
  const breakpoint = useBreakpoint({ breakpoints: ['base', 'sm'] })
  const isMobile = breakpoint === 'base'

  const name = user?.displayName ?? 'Michal Dub'

  if (!user) return null

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant="subtle"
          as={HStack}
          pr={2}
          pl={1}
          gap={{ base: 0, sm: 2 }}
          borderRadius={'full'}
        >
          <Avatar name={name} size="xs" />
          {!isMobile && (
            <Stack gap={0} lineHeight={1.25}>
              <Text fontSize="xs" fontWeight="medium">
                {name}
              </Text>
              <Text color="fg.muted" fontSize="xs">
                {user.email}
              </Text>
            </Stack>
          )}
          <Icon size="sm" color="fg.subtle">
            <LuChevronDown />
          </Icon>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <RouterMenuItem value="portal" to={route.portal()}>
          <LuArchive />
          Moje řízení
        </RouterMenuItem>
        <MenuItem value="signOut" onClick={signOut}>
          <LuLogOut />
          Odhlásit se
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}

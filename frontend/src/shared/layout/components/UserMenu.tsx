import { HStack, Icon, Stack, Text, useBreakpoint } from '@chakra-ui/react'
import {
  ArchiveIcon,
  ChevronDown as ChevronDownIcon,
  LogOutIcon,
  User2Icon,
  Users2Icon,
} from 'lucide-react'

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
  const isAdmin = user?.type === 'Admin'

  const name = user?.displayName

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
              {name && (
                <Text fontSize="xs" fontWeight="medium">
                  {name}
                </Text>
              )}
              <Text color="fg.muted" fontSize="xs">
                {user.email}
              </Text>
            </Stack>
          )}
          <Icon size="sm" color="fg.subtle">
            <ChevronDownIcon />
          </Icon>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <RouterMenuItem value="portal" to={route.portal()}>
          <Icon>
            <ArchiveIcon />
          </Icon>
          Moje řízení
        </RouterMenuItem>
        <RouterMenuItem value="profile" to={route.profile()}>
          <Icon>
            <User2Icon />
          </Icon>
          Můj profil
        </RouterMenuItem>
        <RouterMenuItem value="admin" to={route.users()} hidden={!isAdmin}>
          <Icon>
            <Users2Icon />
          </Icon>
          Správa uživatelů
        </RouterMenuItem>
        <MenuItem value="signOut" onClick={signOut}>
          <Icon>
            <LogOutIcon />
          </Icon>
          Odhlásit se
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}

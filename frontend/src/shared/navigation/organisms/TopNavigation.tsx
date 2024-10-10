import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useMediaQuery,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@frontend/route'
import { NavLink, Stack } from '@frontend/shared/design-system'

import { RouterMenuItem, RouterNavLink } from '../atoms'

export function TopNavigation() {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const { user, signOut } = useAuth()

  return (
    <Stack direction="row" spacing="0" alignItems="center" color="primary.900">
      {!isMobile && (
        <Flex gap={2}>
          <RouterNavLink to={route.home()}>Home</RouterNavLink>
          <RouterNavLink to={route.guide()}>How to use</RouterNavLink>
          <RouterNavLink to={route.about()}>About us</RouterNavLink>
          <RouterNavLink to={route.blog()}>Blog</RouterNavLink>
          {user === null ? (
            <>
              <Menu>
                <NavLink as={MenuButton}>Login</NavLink>
                <MenuList>
                  <RouterNavLink to={route.signIn()}>Sign In</RouterNavLink>
                  <RouterNavLink to={route.signUp()}>Sign Up</RouterNavLink>
                </MenuList>
              </Menu>
            </>
          ) : (
            <NavLink onClick={() => signOut()}>Sign Out</NavLink>
          )}
        </Flex>
      )}
      {isMobile && (
        <Menu>
          <MenuButton as={IconButton} icon={<FiMenu />} />
          <MenuList>
            {user === null ? (
              <>
                <RouterMenuItem to={route.signIn()}>Přihlášení</RouterMenuItem>
                <RouterMenuItem to={route.signUp()}>Registrace</RouterMenuItem>
              </>
            ) : (
              <MenuItem onClick={() => signOut()}>Odhlásit se</MenuItem>
            )}
            <MenuGroup title="Help">
              <RouterMenuItem to={route.guide()}>How to use</RouterMenuItem>
              <RouterMenuItem to={route.about()}>About us</RouterMenuItem>
              <RouterMenuItem to={route.blog()}>Blog</RouterMenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
    </Stack>
  )
}

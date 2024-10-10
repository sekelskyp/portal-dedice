import { Heading, Image, Menu, MenuButton, MenuList } from '@chakra-ui/react'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@frontend/route'
import { Button, Stack } from '@frontend/shared/design-system'

import { RouterNavLink } from '../atoms'

export function TopNavigation() {
  const { user, signOut } = useAuth()
  return (
    <Stack direction="row" spacing="0" alignItems="center" color="primary.900">
      <RouterNavLink to={route.home()}>Home</RouterNavLink>
      <RouterNavLink to={route.guide()}>How to use</RouterNavLink>
      <RouterNavLink to={route.about()}>About us</RouterNavLink>
      <RouterNavLink to={route.blog()}>Blog</RouterNavLink>
      {user === null ? (
        <>
        <Menu>
          <MenuButton 
          px="4"
          py="3" 
          fontSize="sm"
          ml="2"
          _hover={{
            bg: 'blackAlpha.400',
          }}
          _activeLink={{
            bg: 'blackAlpha.300',
            _hover: {
              bg: 'blackAlpha.400',
            },
          }}
          >
            Login
          </MenuButton>
          <MenuList>
            <RouterNavLink to={route.signIn()}>Sign In</RouterNavLink>
            <RouterNavLink to={route.signUp()}>Sign Up</RouterNavLink>
          </MenuList>
        </Menu>
        </>
      ) : (
        <Button ml="2" onClick={() => signOut()}>
          Sign Out
        </Button>
      )}
    </Stack>
  )
}

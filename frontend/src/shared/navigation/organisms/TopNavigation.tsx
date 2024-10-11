import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  ThemingProps,
  useMediaQuery,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@frontend/route'
import { Stack } from '@frontend/shared/design-system'

import { RouterMenuItem, RouterNavLink } from '../atoms'

export interface NavItem {
  label: string
  to: string
  styleProps?: ThemingProps
}

export function TopNavigation() {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const { user } = useAuth()

  const navItems: NavItem[] = [
    {
      label: 'Jak to funguje',
      to: route.guide(),
    },
    {
      label: 'O nás',
      to: route.about(),
    },
    {
      label: 'Blog',
      to: route.blog(),
    },
  ]

  if (user) {
    navItems.push({
      label: 'Odhlásit se',
      to: route.signOut(),
    })
  } else {
    navItems.push({
      label: 'Přihlásit se',
      to: route.signIn(),
    })
    navItems.push({
      label: 'Registrovat se',
      to: route.signUp(),
      styleProps: { variant: 'solid' },
    })
  }

  return (
    <Stack direction="row" spacing="0" alignItems="center" color="primary.900">
      {!isMobile && (
        <Flex gap={2} flexWrap="wrap" justifyContent="right">
          {navItems.map(({ to, label, styleProps }) => (
            <RouterNavLink to={to} key={to} {...styleProps}>
              {label}
            </RouterNavLink>
          ))}
        </Flex>
      )}
      {isMobile && (
        <Menu>
          <MenuButton as={IconButton} icon={<FiMenu />} />
          <MenuList>
            {navItems.map(({ to, label, styleProps }) => (
              <RouterMenuItem to={to} key={to} {...styleProps}>
                {label}
              </RouterMenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Stack>
  )
}

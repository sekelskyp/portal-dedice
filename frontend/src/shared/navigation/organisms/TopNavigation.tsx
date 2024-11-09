import { Flex } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { useMediaQuery } from 'usehooks-ts'

import { useAuth } from '@frontend/modules/auth'
import {
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Stack,
} from '@frontend/shared/design-system'
import { route } from '@shared/route'

import { RouterMenuItem, RouterNavLink } from '../atoms'

export interface NavItem {
  label: string
  to?: string
  onClick?: () => void
  highlight?: boolean
}

export function TopNavigation() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { user, signOut } = useAuth()

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
      onClick: () => signOut(),
    })

    navItems.push({
      label: 'Moje řízení',
      to: route.portal(),
      highlight: true,
    })
  } else {
    navItems.push({
      label: 'Přihlásit se',
      to: route.signIn(),
    })
    navItems.push({
      label: 'Registrovat se',
      to: route.signUp(),
      highlight: true,
    })
  }

  return (
    <Stack direction="row" gap={0} alignItems="center" color="fg">
      {!isMobile && (
        <Flex gap={2} flexWrap="wrap" justifyContent="right">
          {navItems.map(({ to, onClick, label, highlight, ...rest }) =>
            to ? (
              <RouterNavLink
                variant={highlight ? 'solid' : 'ghost'}
                to={to}
                key={to}
                {...rest}
              >
                {label}
              </RouterNavLink>
            ) : (
              <Button
                key={label}
                variant={highlight ? 'solid' : 'ghost'}
                onClick={onClick}
                {...rest}
              >
                {label}
              </Button>
            )
          )}
        </Flex>
      )}
      {isMobile && (
        <MenuRoot>
          <MenuTrigger asChild>
            <Button>
              <FiMenu />
            </Button>
          </MenuTrigger>
          <MenuContent>
            {navItems.map(({ to, onClick, label, highlight, ...rest }) =>
              to ? (
                <RouterMenuItem to={to} key={to} value={label} {...rest}>
                  {label}
                </RouterMenuItem>
              ) : (
                <MenuItem key={label} onClick={onClick} value={label} {...rest}>
                  {label}
                </MenuItem>
              )
            )}
          </MenuContent>
        </MenuRoot>
      )}
    </Stack>
  )
}

import { Flex, Icon } from '@chakra-ui/react'
import { LuMenu } from 'react-icons/lu'
import { useMediaQuery } from 'usehooks-ts'

import { useAuth } from '@frontend/modules/auth'
import {
  Button,
  MenuContent,
  MenuRoot,
  MenuTrigger,
  Stack,
} from '@frontend/shared/design-system'
import { route } from '@shared/route'

import { RouterMenuItem, RouterNavLink } from '../atoms'

export interface NavItem {
  label: string
  to: string
  highlight?: boolean
}

export function TopNavigation() {
  const isMobile = useMediaQuery('(max-width: 768px)')

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

  if (!user) {
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
          {navItems.map(({ to, label, highlight, ...rest }) => (
            <RouterNavLink
              variant={highlight ? 'solid' : 'ghost'}
              to={to}
              key={to}
              {...rest}
            >
              {label}
            </RouterNavLink>
          ))}
        </Flex>
      )}
      {isMobile && (
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="subtle" borderRadius="full">
              <Icon size="md" mx={-1.5}>
                <LuMenu />
              </Icon>
            </Button>
          </MenuTrigger>
          <MenuContent>
            {navItems.map(({ to, label, highlight, ...rest }) => (
              <RouterMenuItem to={to} key={to} value={label} {...rest}>
                {label}
              </RouterMenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      )}
    </Stack>
  )
}

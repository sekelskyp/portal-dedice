import { Flex, Icon } from '@chakra-ui/react'
import {
  Button,
  MenuContent,
  MenuRoot,
  MenuTrigger,
  Stack,
} from '@components/ui'
import { RouterMenuItem } from '@components/ui/router-menu-item'
import { RouterNavLink } from '@components/ui/router-nav-link'
import { route } from '@lib/route'
import { useAuth } from '@src/modules/auth'
import { Menu as MenuIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

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
      label: 'Nachytřovadlo',
      to: route.wizard(),
    },
    {
      label: 'Modelace',
      to: route.inheritance(),
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
                <MenuIcon />
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

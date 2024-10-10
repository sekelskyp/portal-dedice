import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import {
  NavLink as ReactRouterNavLink,
  type NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router-dom'

type Props = Omit<MenuItemProps, 'as'> & ReactRouterNavLinkProps

export function RouterMenuItem(props: Props) {
  return <MenuItem {...props} as={ReactRouterNavLink} />
}

import { MenuItem, MenuItemProps } from '@components/ui'
import {
  NavLink as ReactRouterNavLink,
  type NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router-dom'

type Props = Omit<MenuItemProps, 'as'> & ReactRouterNavLinkProps

export function RouterMenuItem(props: Props) {
  return (
    <MenuItem asChild value={props.to.toString()}>
      <ReactRouterNavLink {...props} />
    </MenuItem>
  )
}

import {
  NavLink as ReactRouterNavLink,
  type NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router-dom'

import { MenuItem, MenuItemProps } from '@frontend/shared/design-system'

type Props = Omit<MenuItemProps, 'as'> & ReactRouterNavLinkProps

export function RouterMenuItem(props: Props) {
  return (
    <MenuItem asChild value={props.to.toString()}>
      <ReactRouterNavLink {...props} />
    </MenuItem>
  )
}

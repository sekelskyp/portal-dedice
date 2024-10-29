import { NavLink as ReactRouterNavLink } from 'react-router-dom'

import { Button, ButtonProps } from '@frontend/shared/design-system'

export interface RouterNavLinkProps extends ButtonProps {
  to: string
}

export function RouterNavLink(props: RouterNavLinkProps) {
  return (
    <Button asChild {...props}>
      <ReactRouterNavLink to={props.to}>{props.children}</ReactRouterNavLink>
    </Button>
  )
}

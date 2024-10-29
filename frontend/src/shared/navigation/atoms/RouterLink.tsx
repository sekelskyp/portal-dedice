import { Link, LinkProps } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

export interface RouterLinkProps extends LinkProps {
  to: string
}

export const RouterLink = (props: RouterLinkProps) => {
  return (
    <Link asChild {...props}>
      <ReactRouterLink to={props.to}>{props.children}</ReactRouterLink>
    </Link>
  )
}

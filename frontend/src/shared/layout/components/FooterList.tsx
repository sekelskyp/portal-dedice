import { Heading, List, Stack } from '@chakra-ui/react'

import { RouterLink } from '@frontend/shared/navigation/atoms'

type FooterListProps = {
  title: string
  links: { id: number; title: string; link: string }[]
}

export function FooterList({ title, links }: FooterListProps) {
  return (
    <Stack direction="column" textAlign={{ base: 'center', md: 'left' }}>
      <Heading size={{ base: 'sm', md: 'md' }}>{title}</Heading>
      <List.Root>
        {links.map((link) => (
          <List.Item key={link.id} textAlign="left">
            <RouterLink to={link.link}>{link.title}</RouterLink>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  )
}

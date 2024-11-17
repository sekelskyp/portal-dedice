import { Heading, List, Stack } from '@chakra-ui/react'

import { RouterLink } from '@frontend/shared/navigation/atoms'

type FooterListProps = {
  title: string
  links: { id: number; title: string; link: string }[]
}

export function FooterList({ title, links }: FooterListProps) {
  return (
    <Stack>
      <Heading size={{ base: 'sm', md: 'md' }}>{title}</Heading>
      <List.Root>
        {links.map((link) => (
          <List.Item key={link.id} whiteSpace="nowrap">
            <RouterLink to={link.link}>{link.title}</RouterLink>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  )
}

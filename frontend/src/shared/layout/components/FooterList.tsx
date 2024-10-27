import { Heading, List, ListItem, Stack } from '@chakra-ui/react'

import { RouterLink } from '@frontend/shared/navigation/atoms'

type FooterListProps = {
  title: string
  links: { id: number; title: string; link: () => string }[]
}

export function FooterList({ title, links }: FooterListProps) {
  return (
    <Stack direction="column" textAlign={{ base: 'center', md: 'left' }}>
      <Heading size={{ base: 'sm', md: 'md' }}>{title}</Heading>
      <List spacing={2}>
        {links.map((link) => (
          <ListItem key={link.id}>
            <RouterLink
              to={link.link}
              color="black"
              textDecoration="underline"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              {link.title}
            </RouterLink>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

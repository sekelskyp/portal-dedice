import { Heading, List, Stack } from '@chakra-ui/react'
import { RouterLink } from '@components/ui/router-link'

type FooterListProps = {
  title: string
  links: { id: number; title: string; link: string }[]
}

export function FooterList({ title, links }: FooterListProps) {
  return (
    <Stack gap={4}>
      <Heading size={{ base: 'sm', md: 'md' }}>{title}</Heading>
      <List.Root listStyleType={'none'} gap={4}>
        {links.map((link) => (
          <List.Item key={link.id} whiteSpace="nowrap">
            <RouterLink to={link.link}>{link.title}</RouterLink>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  )
}

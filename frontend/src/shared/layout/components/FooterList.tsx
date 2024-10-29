import { Heading, Link, List, Stack } from '@chakra-ui/react'

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
          <List.Item key={link.id}>
            <Link href={link.link}>{link.title}</Link>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  )
}

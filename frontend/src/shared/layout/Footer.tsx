import {
  Box,
  Container,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react'

const footerLinks = [
  {
    id: 1,
    title: 'Lorem Ipsum',
    link: '#',
  },
  {
    id: 2,
    title: 'Lorem Ipsum',
    link: '#',
  },
  {
    id: 3,
    title: 'Lorem Ipsum',
    link: '#',
  },
]

const FooterList = ({
  title,
  links,
}: {
  title: string
  links: { id: number; title: string; link: string }[]
}) => {
  return (
    <Stack direction="column">
      <Heading as="h2" size="h2">
        {title}
      </Heading>
      <List textAlign="center">
        {links.map((link) => (
          <ListItem key={link.id}>
            <Link href={link.link}>{link.title}</Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export const Footer = () => {
  return (
    <Box bg="gray.300">
      <Container maxW="container.xl">
        <Stack
          direction="column"
          spacing={2}
          align="center"
          justify="space-between"
          pt={4}
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing={12} pt={2}>
            {footerLinks.map((footerLink) => (
              <FooterList
                key={footerLink.id}
                title={footerLink.title}
                links={footerLinks}
              />
            ))}
          </Stack>
          <Heading as="h4" size="h4" m={4} textAlign="center">
            2024 by VŠE, Applifting.
          </Heading>
          <Heading as="h4" size="h4" mb={4} textAlign="center">
            © 2024 Portál dědice. Všechna práva vyhrazena.
          </Heading>
        </Stack>
      </Container>
    </Box>
  )
}

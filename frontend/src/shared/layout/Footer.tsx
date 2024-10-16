import {
  Box,
  Container,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Stack,
  Text,
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
    <Stack direction="column" textAlign={{ base: 'center', md: 'left' }}>
      <Heading size="md">{title}</Heading>
      <List>
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
    <Box bg="gray.200">
      <Container as={Stack} gap={8} maxW="container.xl" p={8} pb={4}>
        <Stack gap={16} direction="row" alignItems="start">
          <Stack
            gap={4}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
          >
            <Heading size="lg" whiteSpace="nowrap">
              Portál dědice
            </Heading>
            <Image h={16} src="/logo-nkcr.png" alt="logo" />
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 4, md: 12 }}
          >
            {footerLinks.map((footerLink) => (
              <FooterList
                key={footerLink.id}
                title={footerLink.title}
                links={footerLinks}
              />
            ))}
          </Stack>
        </Stack>
        <Text fontSize="sm">
          © 2024 Vytvořeno na VŠE v rámci předmětu 4IT580
        </Text>
      </Container>
    </Box>
  )
}

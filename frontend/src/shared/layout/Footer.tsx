import { Box, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'

import { FooterList } from './components/FooterList'
import { footerLinks } from './links'

export const Footer = () => {
  return (
    <Box bg="gray.200" pb={4}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        p={4}
        justifyContent="space-between"
        mx={{ base: 0, md: 6, lg: 16 }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          py={0}
        >
          <Image h={{ base: 16, md: 20 }} src="/logo.png" alt="logo" />
          <Stack
            direction="column"
            ml={{ base: 0, md: 8 }}
            spacing={0}
            pr={{ base: 0, md: 8 }}
          >
            <Heading
              size={{ base: 'lg', lg: 'xl' }}
              whiteSpace="nowrap"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Portál Dědice
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              color="gray.700"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Nová éra digitalizace pozůstalostního řízení
            </Text>
          </Stack>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 4, md: 12 }}
        >
          {footerLinks.map((footerLink) => (
            <FooterList key={footerLink.id} {...footerLink} />
          ))}
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Divider width="95%" borderColor="gray.400" pt={4} />
        <Text fontSize={{ base: 'sm', md: 'md' }} pt={2} textAlign="center">
          © 2024 Vytvořeno na VŠE ve spolupráci s Applifting.
        </Text>
      </Stack>
    </Box>
  )
}

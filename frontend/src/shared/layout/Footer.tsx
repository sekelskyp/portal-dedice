import {
  Box,
  Container,
  Heading,
  Image,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTheme } from 'next-themes'

import { FooterList } from './components/FooterList'
import { footerLinks } from './links'

export const Footer = () => {
  const theme = useTheme()
  const isDark = theme.resolvedTheme === 'dark'

  return (
    <Box bg="bg.muted" pb={4}>
      <Stack px={6}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          p={4}
          justifyContent="space-between"
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            alignItems="center"
            py={0}
          >
            <Image
              h={{ base: 16, md: 20 }}
              src={isDark ? '/logo-dark.png' : '/logo.png'}
              opacity={isDark ? 0.8 : 1}
              alt="logo"
            />
            <Stack
              direction="column"
              ml={{ base: 0, md: 8 }}
              gap={0}
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
                color="fg/50"
                textAlign={{ base: 'center', md: 'left' }}
              >
                Nová éra digitalizace pozůstalostního řízení
              </Text>
            </Stack>
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 4, md: 12 }}
          >
            {footerLinks.map((footerLink) => (
              <FooterList key={footerLink.id} {...footerLink} />
            ))}
          </Stack>
        </Stack>
        <Stack alignItems="center">
          <Separator width="95%" borderColor="gray.400" mt={6} />
          <Text fontSize={{ base: 'sm', md: 'md' }} mt={2} textAlign="center">
            © 2024 Vytvořeno na VŠE ve spolupráci s Applifting.
          </Text>
          <ColorModeButton />
        </Stack>
      </Stack>
    </Box>
  )
}

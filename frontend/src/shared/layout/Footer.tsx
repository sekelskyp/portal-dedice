import {
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTheme } from 'next-themes'

import { ColorModeButton } from '../design-system/atoms/chakra'

import { FooterList } from './components/FooterList'
import { footerLinks } from './utils/links'

export const Footer = () => {
  const theme = useTheme()
  const isDark = theme.resolvedTheme === 'dark'

  return (
    <Box
      bg="bg.panel"
      boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.06)"
      borderTop="1px solid"
      borderColor="bg.muted"
      pb={4}
    >
      <Container as={Stack} px={2}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          p={4}
          gap={8}
          justifyContent="space-between"
        >
          <HStack py={0} maxW={{ base: 'full', md: '2xs', lg: 'full' }}>
            <Image
              h={{ base: 12, lg: 16 }}
              src={isDark ? '/logo-dark.png' : '/logo.png'}
              opacity={isDark ? 0.8 : 1}
              alt="logo"
            />
            <Stack direction="column" ml={{ base: 4, md: 8 }} gap={0}>
              <Heading size={{ base: 'lg', lg: 'xl' }} whiteSpace="nowrap">
                Portál Dědice
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="fg/50">
                Nová éra digitalizace pozůstalostního řízení
              </Text>
            </Stack>
          </HStack>
          <Grid
            w={{ base: 'full', md: 'auto' }}
            templateColumns={{
              base: '1fr 1fr',
              sm: `repeat(${footerLinks.length}, 1fr)`,
            }}
            alignItems={'end'}
            gap={{ base: 4, md: 8, lg: 12 }}
          >
            {footerLinks.map((footerLink) => (
              <FooterList key={footerLink.id} {...footerLink} />
            ))}
          </Grid>
        </Stack>
        <Stack alignItems="center">
          <Separator
            width="95%"
            borderColor="gray.400"
            mt={{ base: 0, md: 6 }}
          />
          <Text fontSize={{ base: 'sm', md: 'md' }} mt={2} textAlign="center">
            © 2024 Vytvořeno na VŠE ve spolupráci s Applifting.
          </Text>
          <ColorModeButton />
        </Stack>
      </Container>
    </Box>
  )
}

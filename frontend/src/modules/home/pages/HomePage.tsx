import { Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Button } from '@frontend/shared/design-system'
import { SimpleCentered } from '@frontend/shared/design-system/atoms/CTA/SimpleCentered'
import { SplitWithImage } from '@frontend/shared/design-system/atoms/CTA/SplitWithImage'
import { Page } from '@frontend/shared/layout'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { HomePageShowcase } from '../components/HomePageShowcase'

export function HomePage() {
  const { user } = useAuth()

  return (
    <Page as={Stack} gap={10} justifyContent={'space-between'} h={'full'}>
      <SplitWithImage
        imageSrc="/holding-hands.jpg"
        imageAlt="Ilustrace dvou lidí držících se za ruce."
      >
        <Heading as="h3" size="4xl">
          Portál Dědice
        </Heading>
        <Heading size="xl">
          Váš průvodce pozůstalostním řízením.{' '}
          <Text as="span" color="primary.600">
            Přehledně a online.
          </Text>
        </Heading>
        <Text mr={16} textAlign="justify" lineHeight={1.8}>
          Potřebujete poradit s pozůstalostním řízením? Nebo chcete vyřešit
          předběžné šetření online? Portál dědice vám srozumitelně vysvětlí vše,
          co potřebujete vědět a pomůze vám vyřešit předběžné šetření online.
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
          <RouterNavLink to={route.wizard()}>Průvodce řízením</RouterNavLink>
          <RouterNavLink to={route.signUp()}>
            Předběžné šetření online
          </RouterNavLink>
        </Stack>
      </SplitWithImage>
      {!user && (
        <SimpleCentered bgColor="blue.bg">
          <Heading as="h3" size="4xl">
            Řešíte předběžné šetření?
          </Heading>
          <Text>
            Komunikujte s notářem a ostatními dědici v portálu pro předběžné
            šetření. Zaregistujte se a získejte přístup k portálu.
          </Text>
          <Button size="lg" asChild>
            <Link to={route.signUp()}>Registrovat se</Link>
          </Button>
        </SimpleCentered>
      )}
      <Heading size="3xl" textAlign="center">
        Služby Portálu Dědice
      </Heading>
      <HomePageShowcase />
    </Page>
  )
}

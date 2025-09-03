import { Heading, Stack, Text } from '@chakra-ui/react'
import { Page } from '@components/layout/page'
import { SplitWithImage } from '@components/layout/split-with-image'
import { RouterNavLink } from '@components/ui/router-nav-link'
import { route } from '@lib/route'

import holdingHands from '/holding-hands.webp'

import { HomePageShowcase } from '../components/HomePageShowcase'
import { landingPageFeatures } from '../utils/landingpage-features'

export function HomePage() {
  return (
    <Page as={Stack} gap={10} justifyContent={'space-between'} h={'full'}>
      <SplitWithImage
        imageSrc={holdingHands}
        imageAlt="Ilustrace dvou lidí držících se za ruce."
      >
        <Heading as="h3" size={{ base: '2xl', md: '4xl' }}>
          Portál Dědice
        </Heading>
        <Heading size={{ base: 'lg', md: 'xl' }}>
          Váš průvodce pozůstalostním řízením.{' '}
          <Text
            as="span"
            color="primary.600"
            fontSize={{ base: 'lg', md: 'xl' }}
          >
            Přehledně a online.
          </Text>
        </Heading>
        <Text
          mr={{ base: 8, md: 16 }}
          textAlign="justify"
          lineHeight={{ base: 1.4, md: 1.8 }}
          letterSpacing={'tight'}
          fontSize="md"
          mt={4}
        >
          Potřebujete poradit s pozůstalostním řízením? Nebo chcete vyřešit
          předběžné šetření online? Portál dědice vám srozumitelně vysvětlí vše,
          co potřebujete vědět a pomůze vám vyřešit předběžné šetření online.
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} gap={4} mt={8}>
          <RouterNavLink to={route.wizard()}>Průvodce řízením</RouterNavLink>
          <RouterNavLink to={route.signUp()}>
            Předběžné šetření online
          </RouterNavLink>
        </Stack>
      </SplitWithImage>
      <Heading size="3xl" textAlign="center">
        Další služby Portálu Dědice
      </Heading>
      <HomePageShowcase data={landingPageFeatures} />
    </Page>
  )
}

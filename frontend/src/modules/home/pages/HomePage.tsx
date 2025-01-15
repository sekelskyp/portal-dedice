import { Heading, Stack, Text } from '@chakra-ui/react'

import { SplitWithImage } from '@frontend/shared/design-system/atoms/CTA/SplitWithImage'
import { Page } from '@frontend/shared/layout'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { HomePageShowcase } from '../components/HomePageShowcase'
import { landingPageFeatures } from '../utils/homepage-buttons'

export function HomePage() {
  return (
    <Page as={Stack} gap={10} justifyContent={'space-between'} h={'full'}>
      <SplitWithImage
        imageSrc="/holding-hands.jpg"
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
          fontSize="md"
        >
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
      <Heading size="3xl" textAlign="center">
        Další služby Portálu Dědice
      </Heading>
      <HomePageShowcase data={landingPageFeatures} />
    </Page>
  )
}

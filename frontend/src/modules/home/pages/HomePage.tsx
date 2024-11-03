import { Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Button } from '@frontend/shared/design-system'
import { SimpleCentered } from '@frontend/shared/design-system/atoms/CTA/SimpleCentered'
import { SplitWithImage } from '@frontend/shared/design-system/atoms/CTA/SplitWithImage'
import { Page } from '@frontend/shared/layout'
import { route } from '@shared/route'

export function HomePage() {
  const { user } = useAuth()

  return (
    <Page as={Stack} gap={10} justifyContent={'space-between'} h={'full'}>
      {user && (
        <SimpleCentered bg="none" py={0} my={0}>
          <Heading size={{ base: 'xl', sm: '3xl' }} textAlign="center" mx={10}>
            Vítejte,{' '}
            <Text as="span" color="blue.500">
              {user.email}
            </Text>
          </Heading>
        </SimpleCentered>
      )}
      <SplitWithImage
        imageSrc="/holding-hands.jpg"
        imageAlt="Ilustrace dvou lidí držících se za ruce."
      >
        <Heading as="h3" size="4xl">
          Hledáte pomoc při dědickém řízení?
        </Heading>
        <Text>Využijte náš interaktivní nástroj pro řízení pozůstalosti.</Text>
        <Button asChild>
          <Link to={route.wizard()}>Pojďme na to!</Link>
        </Button>
      </SplitWithImage>
      {!user && (
        <SimpleCentered bgColor="blue.bg">
          <Heading as="h3" size="4xl">
            Řešíte předběžné šetření?
          </Heading>
          <Text>
            Komunikujte s notářem a ostatními dědici v řešení pro předběžné
            šetření. Zaregistujte se a získejte přístup k nástroji.
          </Text>
          <Button size="lg" asChild>
            <Link to={route.signIn()}>Přihlásit se</Link>
          </Button>
        </SimpleCentered>
      )}
    </Page>
  )
}

import { Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@frontend/route'
import { Button } from '@frontend/shared/design-system'
import { SimpleCentered } from '@frontend/shared/design-system/atoms/CTA/SimpleCentered'
import { SplitWithImage } from '@frontend/shared/design-system/atoms/CTA/SplitWithImage'
import { Page } from '@frontend/shared/layout'

export function HomePage() {
  const { user } = useAuth()

  return (
    <Page as={Stack} gap={10} justifyContent={'space-between'} h={'full'}>
      {user && (
        <SimpleCentered bg="none">
          <Heading size="3xl">Vítejte!</Heading>
        </SimpleCentered>
      )}
      <SplitWithImage
        imageSrc="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
        imageAlt="Lidé hledající pomoc"
      >
        <Heading as="h3">Hledáte pomoc při dědickém řízení?</Heading>
        <Text>Využijte náš interaktivní nástroj pro řízení pozůstalosti.</Text>
        <Button as={Link} to={route.wizard()}>
          Pojďme na to!
        </Button>
      </SplitWithImage>
      {!user && (
        <SimpleCentered maxW="container.xl">
          <Heading>Řešíte předběžné šetření?</Heading>
          <Text>
            Komunikujte s notářem a ostatními dědici v řešení pro předběžné
            šetření. Zaregistujte se a získejte přístup k nástroji.
          </Text>
          <Button as={Link} size="lg" to={route.signUp()}>
            Vyřešit online
          </Button>
        </SimpleCentered>
      )}
    </Page>
  )
}

import { Center, Icon, Stack, Text } from '@chakra-ui/react'
import { CircleAlert } from 'lucide-react'

import { Page } from '@frontend/shared/layout'
import { route } from '@shared/route'

import { RouterNavLink } from '../atoms'

export function UnauthorizedPage() {
  return (
    <Page>
      <Center as={Stack} my={8} gap={4}>
        <Icon
          boxSize={{ base: '48px', sm: '64px', md: '72px' }}
          color="red.500"
        >
          <CircleAlert />
        </Icon>
        <Text fontSize={{ sm: 'xl', md: '2xl', lg: '3xl' }} fontWeight="bold">
          Přístup zamítnut.
        </Text>
        <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="gray.600">
          Stránka, kterou se snažíte najít, vyžaduje autorizaci.
        </Text>
        <RouterNavLink to={route.signIn()} size="xl" px={8}>
          Přihlásit se
        </RouterNavLink>
        <RouterNavLink to={route.signUp()} variant="ghost">
          Registrovat se
        </RouterNavLink>
      </Center>
    </Page>
  )
}

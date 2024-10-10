import { useQuery } from '@apollo/client'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { route } from '@frontend/route'
import { Box, Button } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'
import { RouterLink } from '@frontend/shared/navigation/atoms/RouterLink'

const EMPTY_QUERY = gql(/* GraphQL */ `
  query Quacks {
    _empty
  }
`)

export function HomePage() {
  const { user } = useAuth()
  const queryState = useQuery(EMPTY_QUERY)

  return (
    <Page as={Stack} gap={10} justifyContent={'space-between'} h={'full'}>
      <Stack gap={8}>
        <Heading as="h2">Hledáte pomoc při dědickém řízení?</Heading>
        <Text>Využijte náš interaktivní nástroj pro řízení pozůstalosti</Text>
        <RouterLink to={route.wizard()}>Pojďme na to!</RouterLink>
      </Stack>
      <Box>Hello: {user ? user.name : '(not logged in)'}</Box>
      <Box pt="4">GraphQL query result:</Box>
      <Box as="pre" fontFamily="mono">
        {JSON.stringify(queryState.data)}
      </Box>
      <Flex gap={2}>
        <Button>Primary</Button>
        <Button colorScheme="gray">Gray</Button>
      </Flex>
      <Box>
        <Heading as="h1">Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
      </Box>
    </Page>
  )
}

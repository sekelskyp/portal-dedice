import { Card, For } from '@chakra-ui/react'

import { Stack } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'

import { CTAButtons } from '../utils/homepage-buttons'

export function HomePageShowcase() {
  return (
    <Stack
      gap={8}
      direction="row"
      wrap="wrap"
      justifyContent={{ base: 'center', md: 'flex-start' }}
      mb={16}
    >
      <For each={CTAButtons}>
        {(item) => (
          <Card.Root
            key={item.id}
            w={{ base: 'sm', md: 'md' }}
            borderRadius="xl"
            variant="elevated"
          >
            <Card.Body gap="2">
              <Card.Title mb={2} fontSize="xl">
                {item.title}
              </Card.Title>
              <Card.Description>{item.text}</Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-start">
              <RouterNavLink to={item.to}>{item.buttonText}</RouterNavLink>
            </Card.Footer>
          </Card.Root>
        )}
      </For>
    </Stack>
  )
}

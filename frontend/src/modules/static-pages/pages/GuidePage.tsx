import { Flex, Heading, Stack } from '@chakra-ui/react'

import { useAuth } from '@frontend/modules/auth'
import { Box, Button } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

export function GuidePage() {
    const { user } = useAuth()
  
    return (
      <Page as={Stack}>
        <Box color="blue">Lorem ipsum</Box>
      </Page>
    )
  }
import { Stack } from '@chakra-ui/react'

import { Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

export function BlogPage() {
    return (
      <Page as={Stack}>
        <Box color="green">Lorem ipsum</Box>
      </Page>
    )
  }
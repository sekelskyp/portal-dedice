import { Stack } from '@chakra-ui/react'

import { Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

export function GuidePage() {
  return (
    <Page as={Stack}>
      <Box color="blue">Lorem ipsum</Box>
    </Page>
  )
}

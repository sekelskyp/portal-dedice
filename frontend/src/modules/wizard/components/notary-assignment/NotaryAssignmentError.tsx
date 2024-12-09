import { Box, Button, Icon, Text } from '@chakra-ui/react'
import { FiAlertCircle } from 'react-icons/fi'

import { Alert } from '@frontend/shared/design-system'

export function NotaryAssignmentError({
  errorMessage,
  action,
}: {
  errorMessage: string
  action: () => void
}) {
  return (
    <Box textAlign="center" justifyContent="center" justifyItems="center">
      <Icon boxSize={{ base: '48px', sm: '64px', md: '72px' }} color="red.500">
        <FiAlertCircle />
      </Icon>
      <Text
        fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
        my={4}
        mx={{ base: 8, sm: 0 }}
      >
        Při přiřazení notáře se vyskytla chyba.
      </Text>
      <Alert
        status="error"
        width="fit-content"
        fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
        mb={4}
        mx={{ base: 8, sm: 0 }}
        p={4}
      >
        Pro tuto kombinace údajů nelze najít notáře. Zkuste to prosím znovu.
      </Alert>
      <Button mt={4} onClick={action}>
        Zpět na formulář
      </Button>
    </Box>
  )
}

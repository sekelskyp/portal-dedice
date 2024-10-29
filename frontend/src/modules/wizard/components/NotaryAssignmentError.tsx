import { Alert, AlertIcon, Box, Button, Icon, Text } from '@chakra-ui/react'
import { FiAlertCircle } from 'react-icons/fi'

export function NotaryAssignmentError({
  errorMessage,
  action,
}: {
  errorMessage: string
  action: () => void
}) {
  return (
    <Box textAlign="center" justifyContent="center" justifyItems="center">
      <Icon
        as={FiAlertCircle}
        boxSize={{ base: '48px', sm: '64px', md: '72px' }}
        color="red.500"
      />
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
        <AlertIcon />
        {errorMessage}
      </Alert>
      <Button mt={4} onClick={action}>
        Zpět na formulář
      </Button>
    </Box>
  )
}

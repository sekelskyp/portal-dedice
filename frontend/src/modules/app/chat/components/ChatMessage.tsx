import { Box, Flex, Text } from '@chakra-ui/react'

import { Avatar } from '@frontend/shared/design-system'

interface MessageProps {
  body: string
  createdAt: string
  displayName: string
  isCurrent: boolean
}

export default function ChatMessage({
  body,
  createdAt,
  displayName,
  isCurrent,
}: MessageProps) {
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    if (isToday) {
      // Show only time for today's messages
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date)
    }

    // Show full date and time for older messages
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)
  }

  return (
    <Flex maxWidth="50%" gap={2}>
      {!isCurrent && (
        <Avatar
          bg={isCurrent ? 'blue.100' : 'gray.100'}
          color={isCurrent ? 'blue.700' : 'gray.700'}
          name={displayName}
          size="md"
        />
      )}
      <Box bg={isCurrent ? 'blue.100' : 'gray.100'} p={4} borderRadius="xl">
        <Text fontWeight="medium">{displayName}</Text>
        <Text color="gray.600" wordBreak="break-word">
          {body}
        </Text>
        <Text fontSize="sm">{formatDateTime(createdAt)}</Text>
      </Box>
      {isCurrent && (
        <Avatar
          bg={isCurrent ? 'blue.100' : 'gray.100'}
          color={isCurrent ? 'blue.700' : 'gray.700'}
          name={displayName}
          size="md"
        />
      )}
    </Flex>
  )
}

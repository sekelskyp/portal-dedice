import { Box, Flex, Text } from '@chakra-ui/react'

import { Avatar } from '@frontend/shared/design-system'

interface MessageProps {
  body: string
  createdAt: string
  displayName: string
}

export default function ChatMessage({
  body,
  createdAt,
  displayName,
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
    <>
      <Flex
        justifyContent="flex-start"
        gap={2}
        alignItems="flex-end"
        px={2}
        width="100%"
      >
        <Avatar name={displayName} bg={'blue.100'} size={'md'} />
        <Box
          bg={'blue.100'}
          p={4}
          borderRadius="2xl"
          border="1px solid"
          borderColor={'blue.200'}
          boxShadow="md"
        >
          <Text fontSize={'lg'}>{displayName}</Text>
          <Text color="gray.600" wordBreak="break-word">
            {body}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {formatDateTime(createdAt)}
          </Text>
        </Box>
      </Flex>
    </>
  )
}

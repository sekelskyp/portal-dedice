import { Box, Flex, Text } from '@chakra-ui/react'

interface MessageProps {
  userId: number
  body: string
  createdAt: string
  currentUserId?: number
}

export function Message({
  userId,
  body,
  createdAt,
  currentUserId,
}: MessageProps) {
  const isCurrentUser = userId === currentUserId

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
    <Flex justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}>
      <Box
        bg={isCurrentUser ? 'blue.100' : 'gray.100'}
        p={4}
        borderRadius="2xl"
        minW="35%"
        maxW="75%"
        position="relative"
        border="1px solid"
        borderColor={isCurrentUser ? 'blue.200' : 'gray.200'}
        boxShadow="md"
      >
        {`User ${userId}`} <br />
        {body} <br />
        <Text fontSize="sm" color="gray.500">
          {formatDateTime(createdAt)}
        </Text>
      </Box>
    </Flex>
  )
}

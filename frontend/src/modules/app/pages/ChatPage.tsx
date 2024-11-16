import { useCallback } from 'react'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'

import { useAddChatMessage } from '../hooks/useAddChatMessage'
import { useGetChat } from '../hooks/useGetChatMessages'

import { ChatMessageForm } from './ChatMessageForm'

export default function ChatPage() {
  const user = useAuth()
  const { id, name } = useParams()

  const messages = useGetChat(id!)

  const [addChatMessage] = useAddChatMessage()

  const handleChatMessageFormSubmit = useCallback(
    async (data: { message: string }) => {
      await addChatMessage({
        variables: {
          body: data.message,
          chatId: +id!,
          userId: +user.user?.id!,
        },
      })
    },
    [addChatMessage, id, user.user?.id]
  )

  function formatDateTime(dateStr: string) {
    const date = new Date(dateStr)

    const dateFormatted = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)

    return dateFormatted
  }

  return (
    <Page>
      <Container maxW={'3xl'}>
        <Heading>Chat řízení {name}</Heading>
        <Box overflowY="auto" maxH="50vh" mt={6} pr={4}>
          {messages.length === 0 && <Text>No messages yet</Text>}
          <VStack gap={4} align={'stretch'}>
            {messages.map((message) => (
              <Box
                key={message.id}
                bg={message.userId === user.user?.id ? 'blue.100' : 'gray.100'}
                p={4}
                borderRadius="md"
              >
                {`User ${message.userId}`} <br />
                {message.body} <br />
                <Text fontSize="sm" color="gray.500">
                  {formatDateTime(message.createdAt)}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box mt={10}>
          <ChatMessageForm onSubmit={handleChatMessageFormSubmit} />
        </Box>
      </Container>
    </Page>
  )
}

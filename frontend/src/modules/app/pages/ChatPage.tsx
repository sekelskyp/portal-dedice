import { useCallback } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'

import { Chat, ChatMessage } from '@frontend/gql/graphql'
import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'

import { useAddChatMessage } from '../hooks/useAddChatMessage'
import { useBeneficiaryProcedures } from '../hooks/useBeneficiaryProcedures'
import { useGetChat } from '../hooks/useGetChatMessages'

import { ChatMessageForm } from './ChatMessageForm'

export default function ChatPage() {
  const user = useAuth()
  const proceedings = useBeneficiaryProcedures()
  const messages = useGetChat()

  console.log(messages)

  const [addChatMessageRequest, addChatMessageRequestState] =
    useAddChatMessage()

  const handleChatMessageFormSubmit = useCallback(
    async (data: { message: string }) => {
      addChatMessageRequest({
        variables: {
          body: data.message,
          chatId: 1,
          userId: +user.user?.id!,
        },
      })
    },
    [addChatMessageRequest]
  )

  return (
    <Page>
      <Container maxW={'3xl'}>
        <Heading>Chat</Heading>
        {proceedings?.data?.getProceduresByBeneficiaryId.map((item) => (
          <Box>{item.name}</Box>
        ))}
        {messages.map((message) => (
            <Box>{message.body}</Box>
        ))}
        <ChatMessageForm onSubmit={handleChatMessageFormSubmit} />
      </Container>
    </Page>
  )
}

import { useCallback } from 'react'
import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth/auth-core'
import { Page } from '@frontend/shared/layout'

import { useAddMessage } from '../hooks/useAddMessage'

import ChatBody from './ChatBody'
import ChatGroups from './ChatGroups'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

export default function NewChatPage() {
  const { user } = useAuth()
  const userId = +user?.id!

  const { proceedingId } = useParams()

  const [addMessage] = useAddMessage()

  const handleChatMessageSubmit = useCallback(
    async (data: { message: string }) => {
      await addMessage({
        variables: {
          body: data.message,
          proceedingId: +proceedingId!,
          userId: userId,
        },
      })
    },
    [addMessage, proceedingId, userId]
  )

  return (
    <Page>
      <Container maxW="4xl">
        <ChatGroups>
          <ChatHeader
            proceedingId={+proceedingId!}
            isHistory={false}
          ></ChatHeader>
          <ChatBody proceedingId={+proceedingId!} isHistory={false}></ChatBody>
        </ChatGroups>
      </Container>
      <Container maxW={'4xl'} pt={8}>
        <ChatInput onSubmit={handleChatMessageSubmit}></ChatInput>
      </Container>
    </Page>
  )
}

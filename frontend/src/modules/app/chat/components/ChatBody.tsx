import { useEffect, useRef } from 'react'
import { Text, VStack } from '@chakra-ui/react'

import { useAuth } from '@frontend/modules/auth/auth-core'

import { useGetMessages } from '../hooks/useGetMessages'

import ChatMessage from './ChatMessage'

interface ChatBodyProps {
  proceedingId: number
  isHistory: boolean
}

export default function ChatBody({ proceedingId, isHistory }: ChatBodyProps) {
  const { user } = useAuth()
  const { messages, loading, error } = useGetMessages(proceedingId)

  const loggedUserId = user?.id!

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }, [messages])

  return !isHistory ? (
    <VStack gap={4} align="stretch" height="50vh" overflowY="auto">
      {error ? (
        <Text>Došlo k chybě při načítání zpráv</Text>
      ) : loading ? (
        <Text>Načítání...</Text>
      ) : messages.length === 0 ? (
        <Text>V chatu zatím nejsou žádné zprávy</Text>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            body={message.body}
            createdAt={message.createdAt}
            displayName={message.displayName!}
            isCurrent={message.userId === loggedUserId}
          />
        ))
      )}
      <div ref={bottomRef}></div>
    </VStack>
  ) : (
    <VStack gap={4} align="stretch" height="50vh" overflowY="auto">
      {error ? (
        <Text>Došlo k chybě při načítání historie zpráv</Text>
      ) : loading ? (
        <Text>Načítání historie...</Text>
      ) : messages.length === 0 ? (
        <Text>V historii chatu nejsou žádné zprávy</Text>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            body={message.body}
            createdAt={message.createdAt}
            displayName={message.displayName!}
            isCurrent={message.userId === loggedUserId}
          />
        ))
      )}
    </VStack>
  )
}

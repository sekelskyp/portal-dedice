import { useEffect, useRef } from 'react'
import { Text, VStack } from '@chakra-ui/react'

import { useGetMessages } from '../hooks/useGetMessages'

import ChatMessage from './ChatMessage'

interface ChatBodyProps {
  proceedingId: number
}

export default function ChatBody({ proceedingId }: ChatBodyProps) {
  const { messages, loading, error } = useGetMessages(proceedingId)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }, [messages])

  return (
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
          />
        ))
      )}
      <div ref={bottomRef}></div>
    </VStack>
  )
}

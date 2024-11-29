import { VStack } from '@chakra-ui/react'

import { useGetMessages } from '../hooks/useGetMessages'

import ChatMessage from './ChatMessage'

interface ChatBodyProps {
  proceedingId: number
}

export default function ChatBody({ proceedingId }: ChatBodyProps) {
  const { messages, loading, error } = useGetMessages(proceedingId)

  if (loading) return <p>Načítání...</p>
  if (error) return <p>Došlo k chybě při načítání zpráv</p>
  if (messages.length === 0) return <p>Žádné zprávy</p>

  return (
    <VStack gap={4} align="stretch">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          body={message.body}
          createdAt={message.createdAt}
          displayName={message.displayName!}
        />
      ))}
    </VStack>
  )
}

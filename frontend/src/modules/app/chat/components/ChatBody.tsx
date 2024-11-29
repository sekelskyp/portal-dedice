import { VStack } from '@chakra-ui/react'

import { useGetMessages } from '../hooks/useGetMessages'

import ChatMessage from './ChatMessage'

interface ChatBodyProps {
  proceedingId: number
}

export default function ChatBody({ proceedingId }: ChatBodyProps) {
  const messages = useGetMessages(proceedingId)

  if (messages.length === 0) return <p>Zadne zpravy</p>

  return (
    <VStack>
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

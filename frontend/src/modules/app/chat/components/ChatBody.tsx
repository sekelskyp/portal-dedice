import { VStack } from '@chakra-ui/react'

import { AuthUser } from '@frontend/modules/auth/auth-core'

import { useGetMessages } from '../hooks/useGetMessages'

import ChatMessage from './ChatMessage'

interface ChatBodyProps {
  proceedingId: number
  user: AuthUser
}

export default function ChatBody({ proceedingId, user }: ChatBodyProps) {
  const messages = useGetMessages(proceedingId)
  const displayName = user.displayName ?? `${user.name} ${user.surname}`

  if (messages.length === 0) return <p>Zadne zpravy</p>

  return (
    <VStack>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          body={message.body}
          createdAt={message.createdAt}
          displayName={displayName}
        />
      ))}
    </VStack>
  )
}

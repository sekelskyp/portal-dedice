import { useEffect, useRef } from 'react'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

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

  const renderMessages = () => (
    <Grid
      templateColumns="1fr"
      gap={4}
      width="100%"
      px={4}
      maxH={'lg'}
      overflowY={'scroll'}
    >
      {messages.map((message) => {
        const isCurrent = message.userId === loggedUserId

        return (
          <GridItem key={message.id} width="100%">
            <Flex
              width="100%"
              justifyContent={isCurrent ? 'flex-end' : 'flex-start'}
            >
              <ChatMessage
                body={message.body}
                createdAt={message.createdAt}
                displayName={message.displayName!}
                isCurrent={isCurrent}
              />
            </Flex>
          </GridItem>
        )
      })}
    </Grid>
  )

  const content = (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      {error ? (
        <Text px={4}>
          {isHistory
            ? 'Došlo k chybě při načítání historie zpráv'
            : 'Došlo k chybě při načítání zpráv'}
        </Text>
      ) : loading ? (
        <Text px={4}>{isHistory ? 'Načítání historie...' : 'Načítání...'}</Text>
      ) : messages.length === 0 ? (
        <Text px={4}>
          {isHistory
            ? 'V historii chatu nejsou žádné zprávy'
            : 'V chatu zatím nejsou žádné zprávy'}
        </Text>
      ) : (
        renderMessages()
      )}
      {!isHistory && <div ref={bottomRef} />}
    </Box>
  )

  return (
    <Box
      height="100%"
      flex={1}
      width="100%"
      overflowY="auto"
      display="flex"
      flexDirection="column"
    >
      {content}
    </Box>
  )
}

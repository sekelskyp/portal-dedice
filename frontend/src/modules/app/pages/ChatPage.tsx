import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Container, Heading, Tabs, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'

import { Message } from '../components/Message'
import { useAddMessage } from '../hooks/useAddMessage'
import { useBeneficiaryProcedures } from '../hooks/useBeneficiaryProcedures'
import { useGetMessages } from '../hooks/useGetMessages'
import { useNotaryProcedures } from '../hooks/useNotaryProcedures'

import { ChatMessageForm } from './ChatMessageForm'

export default function ChatPage() {
  const user = useAuth()
  const { id } = useParams()
  const messages = useGetMessages(id!)

  const isNotary = user.user?.isNotary

  const notaryProcedures = useNotaryProcedures()
  const beneficiaryProcedures = useBeneficiaryProcedures()

  const procedures = isNotary
    ? notaryProcedures.data?.getProceduresByNotaryId
    : beneficiaryProcedures.data?.getProceduresByBeneficiaryId

  const chatGroups =
    procedures?.map((procedure) => ({
      id: procedure.id,
      name: procedure.name,
    })) ?? []

  const [addMessage] = useAddMessage()
  const navigate = useNavigate()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleChatMessageFormSubmit = useCallback(
    async (data: { message: string }) => {
      await addMessage({
        variables: {
          body: data.message,
          chatId: +id!,
          userId: +user.user?.id!,
        },
      })
      scrollToBottom()
    },
    [addMessage, id, user.user?.id, scrollToBottom]
  )

  const [value, setValue] = useState<string>(id!)

  return (
    <Page>
      <Container maxW={'4xl'}>
        <Tabs.Root
          value={value}
          onValueChange={(e) => {
            setValue(e.value)
            const selectedGroup = chatGroups.find(
              (group) => group.id.toString() === e.value
            )
            if (selectedGroup) {
              navigate(`/portal/chat/${selectedGroup.id}/${selectedGroup.name}`)
            }
          }}
        >
          <Tabs.List>
            {chatGroups.map((group) => (
              <Tabs.Trigger key={group.id} value={group.id.toString()}>
                Řízení {group.name}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
          {chatGroups.map((group) => (
            <Tabs.Content key={group.id} value={group.id.toString()}>
              {value === group.id.toString() && (
                <>
                  <Heading>Společný chat řízení </Heading>
                  <Box position="relative" height="calc(80vh - 200px)">
                    <Box
                      overflowY="auto"
                      maxH="calc(100% - 100px)"
                      p={4}
                      mt={4}
                      mb={20}
                    >
                      {messages.length === 0 && <Text>No messages yet</Text>}
                      <VStack gap={4} align={'stretch'}>
                        {messages.map((message) => (
                          <Message
                            key={message.id}
                            userId={+message.userId}
                            body={message.body}
                            createdAt={message.createdAt}
                            currentUserId={+user.user?.id!}
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </VStack>
                    </Box>
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      p={4}
                      bg="white"
                      borderTop="1px solid"
                      borderColor="gray.200"
                    >
                      <ChatMessageForm onSubmit={handleChatMessageFormSubmit} />
                    </Box>
                  </Box>
                </>
              )}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>
    </Page>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Container, Flex, Tabs, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'

import { Message } from '../components/Message'
import { useAddMessage } from '../hooks/useAddMessage'
import { useBeneficiaryProceedings } from '../hooks/useBeneficiaryProceedings'
import { useGetMessages } from '../hooks/useGetMessages'
import { useNotaryProcedures } from '../hooks/useNotaryProcedures'
import { useProceeding } from '../hooks/useProceeding'

import { ChatMessageForm } from './ChatMessageForm'

//TODO: fix query and components

export default function ChatPage() {
  const user = useAuth()
  const { id } = useParams()
  const messages = useGetMessages(id!)

  const proceeding = useProceeding(+id!).data
    ?.getProceedingById

  const notaryDisplayName = proceeding?.notary?.user?.displayName ?? ''

  const beneficiaryDisplayNames =
    proceeding?.beneficiaries?.map(
      (beneficiary) => beneficiary.user?.displayName
    ) ?? []

  const isNotary = user.user?.type === 'Notary'

  const notaryProcedures = useNotaryProcedures()
  const beneficiaryProcedures = useBeneficiaryProceedings()

  const allNames = [...beneficiaryDisplayNames, notaryDisplayName].join(', ')

  const procedures = isNotary
    ? notaryProcedures.data?.getProceduresByNotaryId
    : beneficiaryProcedures.data?.getBeneficiaryProceedingsForUser

  const chatGroups = useMemo(
    () =>
      procedures?.map((procedure) => ({
        id: procedure.id,
        name: procedure.name,
      })) ?? [],
    [procedures]
  )

  const [addMessage] = useAddMessage()
  const navigate = useNavigate()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (id) {
      setValue(id.toString())
    }
  }, [id])

  const handleChatMessageFormSubmit = useCallback(
    async (data: { message: string }) => {
      await addMessage({
        variables: {
          body: data.message,
          proceedingId: +id!,
          userId: +user.user?.id!,
        },
      })
      scrollToBottom()
    },
    [addMessage, id, user.user?.id, scrollToBottom]
  )

  useEffect(() => {
    if (!id && chatGroups.length > 0) {
      const firstChat = chatGroups[0]
      navigate(`/portal/chat/${firstChat.id}/${firstChat.name}`)
    }
  }, [id, chatGroups, navigate])

  const [value, setValue] = useState<string>(id!)
  const isMobile = useMediaQuery('(max-width: 425px)')
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
          orientation={'horizontal'}
          style={{ height: '100%' }}
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
            <Tabs.Content
              key={group.id}
              value={group.id.toString()}
              style={{ height: isMobile ? 'calc(100vh - 200px)' : 'auto' }}
            >
              {value === group.id.toString() && (
                <Flex direction="column" h="100%">
                  <Text
                    fontSize={isMobile ? 'sm' : 'lg'}
                    fontWeight="bold"
                    p={4}
                    maxLines={2}
                  >
                    Chat s uživateli: {allNames}
                  </Text>
                  <Box flex={1} position="relative">
                    <Box
                      overflowY="auto"
                      height={
                        isMobile ? 'calc(100vh - 300px)' : 'calc(80vh - 200px)'
                      }
                      p={4}
                      mt={4}
                      mb={20}
                    >
                      {messages.length === 0 && (
                        <Text>Tento chat zatím nemá žádné zprávy.</Text>
                      )}
                      <VStack gap={4} align={'stretch'}>
                        {messages.map((message) => (
                          <Message
                            key={message.id}
                            userId={+message.userId}
                            body={message.body}
                            createdAt={message.createdAt}
                            currentUserId={+user.user?.id!}
                            procedureId={+id!}
                            notaryDisplayName={notaryDisplayName}
                            isNotary={isNotary}
                            isMobile={isMobile}
                          />
                        ))}
                      </VStack>
                      <div ref={messagesEndRef} />
                    </Box>
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      p={2} // Reduced padding
                      bg="white"
                      borderTop="1px solid"
                      borderColor="gray.200"
                      width="100%"
                      maxWidth={isMobile ? '100%' : '4xl'} // Match container width
                      mx="auto"
                    >
                      <ChatMessageForm onSubmit={handleChatMessageFormSubmit} />
                    </Box>
                  </Box>
                </Flex>
              )}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>
    </Page>
  )
}

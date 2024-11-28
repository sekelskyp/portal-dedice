import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'

import ChatMessage from '../chat/components/ChatMessage'
import { useGetMessages } from '../chat/hooks/useGetMessages'
import { useProceeding } from '../hooks/useProceeding'

//TODO: fix query and components

export default function ChatPage() {
  const user = useAuth()
  const { id } = useParams()
  const messages = useGetMessages(+id!)
  const isNotary = user.user?.type === 'Notary'

  const proceeding = useProceeding(+id!).data?.getProceedingById

  const notaryDisplayName = proceeding?.notary?.user?.displayName ?? ''

  const beneficiaryDisplayNames =
    proceeding?.beneficiaries?.map(
      (beneficiary) => beneficiary.user?.displayName
    ) ?? []

  const allNames = [...beneficiaryDisplayNames, notaryDisplayName].join(', ')

  const isMobile = useMediaQuery('(max-width: 425px)')
  return (
    <Page>
      <Container maxW={'4xl'}>
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
              height={isMobile ? 'calc(100vh - 300px)' : 'calc(80vh - 200px)'}
              p={4}
              mt={4}
              mb={20}
            >
              {messages.length === 0 && (
                <Text>Tento chat zatím nemá žádné zprávy.</Text>
              )}
              {/*
              <VStack gap={4} align={'stretch'}>
              {messages.map((message) => (
                <ChatMessage
                key={message.id}
                body={message.body}
                createdAt={message.createdAt}
                />
                ))}
                </VStack>
              */}
            </Box>
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={2}
              bg="white"
              borderTop="1px solid"
              borderColor="gray.200"
              width="100%"
              maxWidth={isMobile ? '100%' : '4xl'}
              mx="auto"
            ></Box>
          </Box>
        </Flex>
      </Container>
    </Page>
  )
}

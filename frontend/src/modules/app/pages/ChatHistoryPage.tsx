import { useQuery } from '@apollo/client'
import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'

import { Message } from '../components/Message'
import { useGetMessages } from '../hooks/useGetMessages'

const GET_PROCEDURE = gql(/* GraphQL */ `
  query GetProcedure($id: Int!) {
    getProcedureById(id: $id) {
      notary {
        contact {
          id
          name
          surname
          email
        }
      }
      beneficiaries {
        contact {
          id
          name
          surname
        }
      }
    }
  }
`)

export default function ChatPage() {
  const user = useAuth()
  const { id } = useParams()
  const messages = useGetMessages(id!)

  const procedure =
    useQuery(GET_PROCEDURE, {
      variables: { id: +id! },
    }).data?.getProcedureById ?? {}

  const notaryDisplayName = `${procedure.notary?.contact?.name} ${procedure.notary?.contact?.surname}`

  const beneficiaryDisplayNames =
    procedure.beneficiaries?.map((beneficiary) =>
      beneficiary?.contact
        ? `${beneficiary.contact.name} ${beneficiary.contact.surname}`.trim()
        : ''
    ) ?? []

  const isNotary = user.user?.isNotary ?? false

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
              {messages.length === 0 && <Text>No messages yet</Text>}
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

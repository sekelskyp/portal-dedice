import { Container, Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { Page } from '@frontend/shared/layout'

import ChatBody from './ChatBody'
import ChatHeader from './ChatHeader'

export default function ChatHistoryPage() {
  const { proceedingId } = useParams()

  return (
    <Page>
      <Container maxW="4xl">
        <Flex gap={6} direction="column">
          <ChatHeader
            proceedingId={+proceedingId!}
            isHistory={true}
          ></ChatHeader>
          <ChatBody proceedingId={+proceedingId!} isHistory={true}></ChatBody>
        </Flex>
      </Container>
    </Page>
  )
}

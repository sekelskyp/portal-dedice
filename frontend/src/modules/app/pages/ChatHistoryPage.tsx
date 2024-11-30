import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { Page } from '@frontend/shared/layout'

import ChatBody from '../chat/components/ChatBody'
import ChatGroups from '../chat/components/ChatGroups'
import ChatHeader from '../chat/components/ChatHeader'

export default function ChatPage() {
  const { proceedingId } = useParams()

  return (
    <Page>
      <Container maxW="4xl">
        <ChatGroups>
          <ChatHeader proceedingId={+proceedingId!}></ChatHeader>
          <ChatBody proceedingId={+proceedingId!}></ChatBody>
        </ChatGroups>
      </Container>
    </Page>
  )
}

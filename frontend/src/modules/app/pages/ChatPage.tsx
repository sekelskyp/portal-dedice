import { Container, Heading, HStack, Input } from '@chakra-ui/react'
import { LuUser } from 'react-icons/lu'

import { InputGroup } from '@frontend/shared/design-system'
import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'
import { Page } from '@frontend/shared/layout'

export type ChatPageProps = {
  errorMessage?: string
  onSubmit: (data: {
    email: string
    name: string
    surname: string
    password: string
  }) => void
  loading?: boolean
}

export default function ChatPage() {
  return (
    <Page>
      <Container maxW={'3xl'}>
        <Heading>Chat</Heading>
        <Form onSubmit={() => console.log('Hello')}>
          <HStack>
            <InputGroup flex="1" startElement={<LuUser />}>
              <Input placeholder="Username" />
            </InputGroup>
            <InputFormControl
              name="message"
              placeholder="Napište zprávu..."
            ></InputFormControl>
            <SubmitButton>Odeslat</SubmitButton>
          </HStack>
        </Form>
      </Container>
    </Page>
  )
}

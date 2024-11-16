import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'

const ADD_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation addChatMessage($body: String!, $chatId: Int!, $userId: Int!) {
    addChatMessage(body: $body, chatId: $chatId, userId: $userId) {
      chatId
      body
      userId
    }
  }
`)

export function useAddChatMessage() {
  const [addChatMessage, loading] = useMutation(ADD_MESSAGE_MUTATION)
  return [addChatMessage, loading] as const
}

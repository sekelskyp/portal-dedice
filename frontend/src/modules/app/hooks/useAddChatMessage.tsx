import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'

const ADD_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation addChatMessage($body: String!, $chatId: Int!, $userId: Int!) {
    addChatMessage(body: $body, chatId: $chatId, userId: $userId) {
      id
    }
  }
`)

export function useAddChatMessage() {
  const [addChatMessageRequest, addChatMessageRequestState] =
    useMutation(ADD_MESSAGE_MUTATION)
  return [addChatMessageRequest, addChatMessageRequestState] as const
}

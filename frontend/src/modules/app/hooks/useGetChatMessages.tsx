import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { ChatMessage } from '@frontend/gql/graphql';

const GET_CHAT_QUERY = gql(/* GraphQL */ `
  query getChat($inheritanceProcedureId: Int!) {
    chatByInheritanceProcedureId(
      inheritanceProcedureId: $inheritanceProcedureId
    ) {
      chatMessages {
        body
        chatId
        createdAt
        id
        userId
      }
    }
  }
`)

export function useGetChat() {
  const response = useQuery(GET_CHAT_QUERY, {
    variables: { inheritanceProcedureId: 1 },
  })
  const messages: ChatMessage[] = response.data?.chatByInheritanceProcedureId?.chatMessages ?? [];
  return messages
}

import { useQuery, useSubscription } from '@apollo/client'

import { ChatMessage } from '@frontend/gql/graphql'

import { GET_CHAT_QUERY, SUBSCRIPTION } from '../chatOperations'

export function useGetChat(proceedingId: string) {
  const queryResponse = useQuery(GET_CHAT_QUERY, {
    variables: { inheritanceProcedureId: +proceedingId },
  })

  const subscriptionResponse = useSubscription(SUBSCRIPTION, {
    variables: {
      chatId: +proceedingId,
    },
  })

  const baseMessages: ChatMessage[] =
    queryResponse.data?.chatByInheritanceProcedureId?.chatMessages ?? []

  const subscriptionMessage: ChatMessage =
    subscriptionResponse.data?.newChatMessage!

  return subscriptionMessage
    ? [...baseMessages, subscriptionMessage]
    : baseMessages
}

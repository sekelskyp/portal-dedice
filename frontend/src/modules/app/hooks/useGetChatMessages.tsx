import { useQuery, useSubscription } from '@apollo/client'

import { ChatMessage } from '@frontend/gql/graphql'

import { GET_CHAT_QUERY, SUBSCRIPTION } from '../chatOperations'

export function useGetChat(proceedingId: string) {
  const queryResponse = useQuery(GET_CHAT_QUERY, {
    variables: { inheritanceProcedureId: +proceedingId },
  })

  useSubscription(SUBSCRIPTION, {
    variables: {
      chatId: +proceedingId,
    },
    onSubscriptionData: ({ subscriptionData, client }) => {
      const newMessage = subscriptionData.data?.newChatMessage
      if (!newMessage) return

      client.cache.updateQuery<{
        chatByInheritanceProcedureId: {
          chatMessages: ChatMessage[]
        }
      }>(
        {
          query: GET_CHAT_QUERY,
          variables: { inheritanceProcedureId: +proceedingId },
        },
        (existing) => {
          if (!existing) return existing

          return {
            chatByInheritanceProcedureId: {
              ...existing.chatByInheritanceProcedureId,
              chatMessages: [
                ...(existing.chatByInheritanceProcedureId?.chatMessages || []),
                newMessage,
              ],
            },
          }
        }
      )
    },
  })

  return queryResponse.data?.chatByInheritanceProcedureId?.chatMessages ?? []
}

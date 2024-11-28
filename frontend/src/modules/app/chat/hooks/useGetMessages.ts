import { useQuery, useSubscription } from '@apollo/client'

import { ChatMessage } from '@frontend/gql/graphql'

import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from '../utils/chatOperations'

export function useGetMessages(proceedingId: number) {
  const queryResponse = useQuery(GET_MESSAGES, {
    variables: { proceedingId: proceedingId },
  })

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      proceedingId: proceedingId,
    },
    onData: ({ data, client }) => {
      const newMessage = data.data?.newChatMessage
      if (!newMessage) return

      client.cache.updateQuery<{
        chatByInheritanceProceedingId: {
          chatMessages: ChatMessage[]
        }
      }>(
        {
          query: GET_MESSAGES,
          variables: { proceedingId: proceedingId },
        },
        (existing) => {
          if (!existing) return existing

          return {
            chatByInheritanceProceedingId: {
              ...existing.chatByInheritanceProceedingId,
              chatMessages: [
                ...(existing.chatByInheritanceProceedingId.chatMessages || []),
                newMessage,
              ],
            },
          }
        }
      )
    },
  })

  return queryResponse.data?.chatByProceedingId.chatMessages ?? []
}

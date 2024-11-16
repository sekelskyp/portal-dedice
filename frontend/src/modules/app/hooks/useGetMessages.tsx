import { useQuery, useSubscription } from '@apollo/client'

import { ChatMessage } from '@frontend/gql/graphql'

import { GET_MESSAGES_QUERY, MESSAGE_SUBSCRIPTION } from '../chatOperations'

export function useGetMessages(proceedingId: string) {
  const queryResponse = useQuery(GET_MESSAGES_QUERY, {
    variables: { inheritanceProcedureId: +proceedingId },
  })

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      procedureId: +proceedingId,
    },
    onData: ({ data, client }) => {
      const newMessage = data.data?.newChatMessage
      if (!newMessage) return

      client.cache.updateQuery<{
        chatByInheritanceProcedureId: {
          chatMessages: ChatMessage[]
        }
      }>(
        {
          query: GET_MESSAGES_QUERY,
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

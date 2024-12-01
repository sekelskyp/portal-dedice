import { useQuery, useSubscription } from '@apollo/client'

import { ChatMessage } from '@frontend/gql/graphql'

import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from '../utils/chatOperations'

export function useGetMessages(proceedingId: number) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { proceedingId },
    fetchPolicy: 'cache-and-network',
  })

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { proceedingId },
    onData: ({ data: subscriptionData, client }) => {
      const newMessage = subscriptionData.data?.newChatMessage
      if (!newMessage) return

      const currentData = client.cache.readQuery<{
        chatByProceedingId: {
          chatMessages: ChatMessage[]
        }
      }>({
        query: GET_MESSAGES,
        variables: { proceedingId },
      })

      const messageExists = currentData?.chatByProceedingId.chatMessages.some(
        (msg) => msg.id === newMessage.id
      )

      if (!messageExists) {
        client.cache.writeQuery({
          query: GET_MESSAGES,
          variables: { proceedingId },
          data: {
            chatByProceedingId: {
              ...currentData?.chatByProceedingId,
              chatMessages: [
                ...(currentData?.chatByProceedingId.chatMessages || []),
                newMessage,
              ],
            },
          },
        })
      }
    },
  })

  return {
    messages: data?.chatByProceedingId.chatMessages ?? [],
    loading,
    error,
  }
}

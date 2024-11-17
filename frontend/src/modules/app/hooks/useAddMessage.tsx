import { useMutation } from '@apollo/client'

import { ADD_MESSAGE_MUTATION } from '../chatOperations'

export function useAddMessage() {
  const [addMessage, loading] = useMutation(ADD_MESSAGE_MUTATION)
  return [addMessage, loading] as const
}

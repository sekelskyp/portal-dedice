import { useMutation } from '@apollo/client'

import { ADD_MESSAGE } from '../utils/chatOperations.ts'

export function useAddMessage() {
  const [addMessage, loading] = useMutation(ADD_MESSAGE)
  return [addMessage, loading] as const
}

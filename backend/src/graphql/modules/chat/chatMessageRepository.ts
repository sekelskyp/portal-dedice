import { eq } from 'drizzle-orm'

import { Db } from '@backend/types/types'

import { chatMessage } from '../../../db/schema'

export interface ChatMessageData {
  chatId: number
  userId: number
  body: string
  createdAt: Date
}

export function getChatMessageRepository(db: Db) {
  async function getChatMessagesByChatId(chatId: number) {
    return await db
      .select()
      .from(chatMessage)
      .where(eq(chatMessage.chatId, chatId))
  }

  async function getChatMessageById(id: number) {
    const [result] = await db
      .select()
      .from(chatMessage)
      .where(eq(chatMessage.id, id))
    return result || null
  }

  async function createChatMessage(data: ChatMessageData) {
    const [result] = await db.insert(chatMessage).values(data).$returningId()
    return result
  }

  return {
    getChatMessagesByChatId,
    addChatMessage: createChatMessage,
    getChatMessageById,
  }
}

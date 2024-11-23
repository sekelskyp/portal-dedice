import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { chatMessage } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface ChatMessageEntity
  extends InferSelectModel<typeof chatMessage> {}
export interface ChatMessageInsertInput
  extends InferInsertModel<Omit<typeof chatMessage, 'id'>> {}

export function getChatMessageRepository(db: Db) {
  async function getChatMessagesByChatId(
    chatId: number
  ): Promise<ChatMessageEntity[]> {
    return await db
      .select()
      .from(chatMessage)
      .where(eq(chatMessage.chatId, chatId))
      .orderBy(chatMessage.createdAt)
  }

  async function getChatMessageById(
    id: number
  ): Promise<ChatMessageEntity | null> {
    const [result] = await db
      .select()
      .from(chatMessage)
      .where(eq(chatMessage.id, id))
    return result || null
  }

  async function createChatMessage(
    data: ChatMessageInsertInput
  ): Promise<number> {
    const [result] = await db.insert(chatMessage).values(data).$returningId()
    return result.id
  }

  return {
    getChatMessagesByChatId,
    addChatMessage: createChatMessage,
    getChatMessageById,
  }
}

import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { chatMessage, user } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface ChatMessageEntity
  extends InferSelectModel<typeof chatMessage> {
  /**
   * The display name of the user who sent the message
   */
  displayName?: string
}
export interface ChatMessageInsertInput
  extends InferInsertModel<Omit<typeof chatMessage, 'id'>> {}

export function getChatMessageRepository(db: Db) {
  async function getChatMessagesByChatId(
    chatId: number
  ): Promise<ChatMessageEntity[]> {
    return await db
      .select({
        id: chatMessage.id,
        chatId: chatMessage.chatId,
        userId: chatMessage.userId,
        body: chatMessage.body,
        createdAt: chatMessage.createdAt,
        displayName: user.displayName,
      })
      .from(chatMessage)
      .innerJoin(user, eq(user.id, chatMessage.userId))
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

import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { chat } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface ChatEntity extends InferSelectModel<typeof chat> {}
export interface ChatInsertInput
  extends InferInsertModel<Omit<typeof chat, 'id'>> {}

export function getChatRepository(db: Db) {
  async function getChatById(id: number): Promise<ChatEntity | null> {
    const [result] = await db.select().from(chat).where(eq(chat.id, id))
    return result || null
  }

  async function getChatByProceedingId(
    proceedingId: number
  ): Promise<ChatEntity | null> {
    const [result] = await db
      .select()
      .from(chat)
      .where(eq(chat.proceedingId, proceedingId))
    return result || null
  }

  async function createChat(data: ChatInsertInput): Promise<number> {
    const [result] = await db.insert(chat).values(data).$returningId()
    return result.id
  }

  return {
    getChatById,
    createChat,
    getChatByProceedingId,
  }
}

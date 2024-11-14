import { eq } from 'drizzle-orm'

import { Db } from '@backend/types/types'

import { chat } from '../../../db/schema'

export interface ChatData {
  inheritanceProcedureId: number
}

export function getChatRepository(db: Db) {
  async function getChatById(id: number) {
    const [result] = await db.select().from(chat).where(eq(chat.id, id))
    return result || null
  }

  async function createChat(data: ChatData) {
    const [result] = await db.insert(chat).values(data).$returningId()
    return result
  }

  return {
    getChatById,
    createChat,
  }
}

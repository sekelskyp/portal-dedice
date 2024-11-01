import { and, eq, gt, lt } from 'drizzle-orm'

import { emailConfirmationToken } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface EmailConfirmationTokenData {
  userId: number
  token: string
  expiresAt: Date
}

export function getEmailConfirmationTokenRepository(db: Db) {
  async function createToken(data: EmailConfirmationTokenData) {
    const result = await db
      .insert(emailConfirmationToken)
      .values(data)
      .$returningId()
    return result
  }

  async function getToken(token: string) {
    const [result] = await db
      .select()
      .from(emailConfirmationToken)
      .where(eq(emailConfirmationToken.token, token))
    return result || null
  }

  async function getValidTokenByUserId(userId: number) {
    const [result] = await db
      .select()
      .from(emailConfirmationToken)
      .where(
        and(
          eq(emailConfirmationToken.userId, userId),
          gt(emailConfirmationToken.expiresAt, new Date())
        )
      )
    return result || null
  }

  async function deleteAllExpiredTokens() {
    await db
      .delete(emailConfirmationToken)
      .where(lt(emailConfirmationToken.expiresAt, new Date()))
  }

  async function deleteTokenById(id: number) {
    await db
      .delete(emailConfirmationToken)
      .where(eq(emailConfirmationToken.id, id))
  }

  async function deleteAllTokensForUser(userId: number) {
    await db
      .delete(emailConfirmationToken)
      .where(eq(emailConfirmationToken.userId, userId))
  }

  return {
    createToken,
    getToken,
    getValidTokenByUserId,
    deleteAllExpiredTokens,
    deleteTokenById,
    deleteAllTokensForUser,
  }
}

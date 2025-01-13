import {
  and,
  eq,
  gt,
  InferInsertModel,
  InferSelectModel,
  lt,
} from 'drizzle-orm'

import { emailConfirmationToken } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface EmailConfirmationTokenEntity
  extends InferSelectModel<typeof emailConfirmationToken> {}

export interface EmailConfirmationTokenInsertInput
  extends InferInsertModel<Omit<typeof emailConfirmationToken, 'id'>> {}

export function getEmailConfirmationTokenRepository(db: Db) {
  async function createToken(
    data: EmailConfirmationTokenInsertInput
  ): Promise<number> {
    const [result] = await db
      .insert(emailConfirmationToken)
      .values(data)
      .$returningId()
    return result.id
  }

  async function getToken(
    token: string
  ): Promise<EmailConfirmationTokenEntity | null> {
    const [result] = await db
      .select()
      .from(emailConfirmationToken)
      .where(eq(emailConfirmationToken.token, token))
    return result || null
  }

  async function getValidTokenByUserId(
    userId: number
  ): Promise<EmailConfirmationTokenEntity | null> {
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

  async function deleteAllExpiredTokens(): Promise<void> {
    await db
      .delete(emailConfirmationToken)
      .where(lt(emailConfirmationToken.expiresAt, new Date()))
  }

  async function deleteTokenById(id: number): Promise<void> {
    await db
      .delete(emailConfirmationToken)
      .where(eq(emailConfirmationToken.id, id))
  }

  async function deleteAllTokensForUser(userId: number): Promise<void> {
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

import { and, eq, gt, lt } from 'drizzle-orm'

import { passwordResetToken } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface PasswordResetTokenData {
  userId: number
  token: string
  expiresAt: Date
}

export function getPasswordResetTokenRepository(db: Db) {
  return {
    // Create a new password reset token
    async createToken(data: PasswordResetTokenData) {
      const result = await db
        .insert(passwordResetToken)
        .values(data)
        .$returningId()
      return result
    },

    // Get a password reset token by the token string
    async getToken(token: string) {
      const [result] = await db
        .select()
        .from(passwordResetToken)
        .where(eq(passwordResetToken.token, token))
      return result || null
    },

    // Get valid token by userId (only if not expired)
    async getValidTokenByUserId(userId: number) {
      const [result] = await db
        .select()
        .from(passwordResetToken)
        .where(
          and(
            eq(passwordResetToken.userId, userId),
            gt(passwordResetToken.expiresAt, new Date())
          )
        )
      return result || null
    },

    async deleteAllExpiredTokens() {
      await db
        .delete(passwordResetToken)
        .where(lt(passwordResetToken.expiresAt, new Date()))
    },

    // Delete a token by its ID
    async deleteTokenById(id: number) {
      await db.delete(passwordResetToken).where(eq(passwordResetToken.id, id))
    },

    // Delete all tokens for a user (useful for resetting multiple tokens)
    async deleteAllTokensForUser(userId: number) {
      await db
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.userId, userId))
    },
  }
}

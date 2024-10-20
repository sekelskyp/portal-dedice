import crypto from 'crypto' // For generating secure tokens
import { addHours } from 'date-fns' // For handling token expiration
import { and, eq, gt } from 'drizzle-orm'

import { contact, passwordResetToken, user } from '@backend/db/schema'

import { CustomContext } from '../types/types'

import { sendEmail } from './emailService'
import { hashPassword } from './passwordHashService' // Password hashing function

const RESET_TOKEN_EXPIRATION_HOURS = 1 // Token expires in 1 hour

/**
 * Generate a password reset token and send an email to the user.
 * @param email - The user's email to send the reset link to.
 * @param context - The context to access the database.
 */
export const requestPasswordReset = async (
  email: string,
  context: CustomContext
): Promise<void> => {
  const { db } = context

  // Find the user by email
  const userRecords = await db
    .select({
      userId: user.id,
      userEmail: contact.email,
    })
    .from(user)
    .innerJoin(contact, eq(user.contactId, contact.id))
    .where(eq(contact.email, email))

  if (userRecords.length === 0) {
    // If no user is found, silently return
    return
  }

  const userRecord = userRecords[0]

  // Generate a reset token
  const token = crypto.randomBytes(32).toString('hex')

  // Set expiration time (e.g., 1 hour from now)
  const expiresAt = addHours(new Date(), RESET_TOKEN_EXPIRATION_HOURS)

  // Store the token in the password_reset_tokens table
  await db.insert(passwordResetToken).values({
    userId: userRecord.userId,
    token,
    expiresAt,
  })

  // Generate the reset link (example: https://your-app/reset-password?token=<token>)
  const resetLink = `https://your-app/reset-password?token=${token}`

  // Send the email with the reset link
  await sendEmail({
    to: userRecord.userEmail,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
  })
}

/**
 * Validate the reset token and allow the user to reset their password.
 * @param token - The reset token provided by the user.
 * @param newPassword - The new password the user wants to set.
 * @param context - The context to access the database.
 */
export const resetPassword = async (
  token: string,
  newPassword: string,
  context: CustomContext
): Promise<void> => {
  const { db } = context

  // Find the reset token in the database
  const resetTokenRecords = await db
    .select()
    .from(passwordResetToken)
    .where(
      and(
        eq(passwordResetToken.token, token),
        gt(passwordResetToken.expiresAt, new Date())
      )
    )

  if (resetTokenRecords.length === 0) {
    throw new Error('Invalid or expired reset token')
  }

  const resetToken = resetTokenRecords[0]

  // Find the user associated with the reset token
  const userRecords = await db
    .select()
    .from(user)
    .where(eq(user.id, resetToken.userId))

  if (userRecords.length === 0) {
    throw new Error('User not found')
  }

  const userRecord = userRecords[0]

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword)

  // Update the user's password
  await db
    .update(user)
    .set({ password: hashedPassword })
    .where(eq(user.id, userRecord.id))

  // Optionally, delete the reset token after it's used
  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.id, resetToken.id))
}

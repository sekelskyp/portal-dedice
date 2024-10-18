import crypto from 'crypto' // For generating secure tokens
import { addHours } from 'date-fns' // For handling token expiration

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
  const user = await db.user.findUnique({ where: { email } })
  // we dont want to allow checking whether provided email is used, so we just dont do anything if email doesnt correspond to registered user.
  if (!user) {
    return
  }

  // Generate a reset token
  const token = crypto.randomBytes(32).toString('hex')

  // Set expiration time (e.g., 1 hour from now)
  const expiresAt = addHours(new Date(), RESET_TOKEN_EXPIRATION_HOURS)

  // Store the token in the password_reset_tokens table
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  })

  // Generate the reset link (example: https://your-app/reset-password?token=<token>)
  const resetLink = `https://your-app/reset-password?token=${token}`

  // Send the email with the reset link
  await sendEmail({
    to: user.email,
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
  const resetToken = await db.passwordResetToken.findFirst({
    where: { token, expiresAt: { gt: new Date() } }, // Check if the token is still valid
  })

  if (!resetToken) {
    throw new Error('Invalid or expired reset token')
  }

  // Find the user associated with the reset token
  const user = await db.user.findUnique({ where: { id: resetToken.userId } })
  if (!user) {
    throw new Error('User not found')
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword)

  // Update the user's password
  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  })

  // Optionally, delete the reset token after it's used
  await db.passwordResetToken.delete({ where: { id: resetToken.id } })
}

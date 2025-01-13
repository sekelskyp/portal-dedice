import crypto from 'crypto'
import { addHours } from 'date-fns'

import { route } from '@shared/route'

import { CustomContext } from '../types/types'

import { sendEmail } from './emailService'
import { hashPassword } from './passwordHashService'
import { renderTemplate } from './templateService'

const RESET_TOKEN_EXPIRATION_HOURS = 1 // Token expires in 1 hour

/**
 * Generate a password reset token and send an email to the user.
 * @param email - The user's email to send the reset link to.
 * @param context - The context to access the repositories.
 */
export const requestPasswordReset = async (
  email: string,
  context: CustomContext
): Promise<void> => {
  const { userRepository, passwordResetTokenRepository } = context

  // Find the user associated with the contact
  const userRecord = await userRepository.getUserByEmail(email)
  if (!userRecord) {
    return
  }

  // Generate a reset token
  const token = crypto.randomBytes(32).toString('hex')

  // Set expiration time
  const expiresAt = addHours(new Date(), RESET_TOKEN_EXPIRATION_HOURS)

  // Store the token in the password_reset_tokens table
  await passwordResetTokenRepository.createToken({
    userId: userRecord.id,
    token,
    expiresAt,
  })

  // Generate the reset link
  const baseUrl = `${process.env.APP_BASE_URL_FRONTEND}`
  const resetLink = `${baseUrl}${route.changePassword()}?token=${token}`
  // Render the template
  const html = await renderTemplate('passwordReset', {
    userDisplayName: userRecord.displayName,
    resetLink,
  })
  // Send the email with the reset link
  await sendEmail({
    to: userRecord.email,
    subject: 'Požadavek na změnu hesla',
    html,
  })
}

/**
 * Validate the reset token and allow the user to reset their password.
 * @param token - The reset token provided by the user.
 * @param newPassword - The new password the user wants to set.
 * @param context - The context to access the repositories.
 */
export const resetPassword = async (
  token: string,
  newPassword: string,
  context: CustomContext
): Promise<void> => {
  const { userRepository, passwordResetTokenRepository } = context

  // Find the reset token in the database
  const resetTokenRecord = await passwordResetTokenRepository.getToken(token)
  if (!resetTokenRecord || resetTokenRecord.expiresAt < new Date()) {
    throw new Error(
      'Chybný či vypršelý ověřovací token. Zkuste to prosím znovu.'
    )
  }

  // Find the user associated with the reset token
  const userRecord = await userRepository.getUserById(resetTokenRecord.userId)
  if (!userRecord) {
    throw new Error('User not found')
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword)

  // Update the user's password
  await userRepository.updateUserById(userRecord.id, {
    password: hashedPassword,
  })

  // Delete the reset token after it's used
  await passwordResetTokenRepository.deleteTokenById(resetTokenRecord.id)
}

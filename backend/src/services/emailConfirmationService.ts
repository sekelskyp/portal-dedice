import crypto from 'crypto'
import { addHours } from 'date-fns'

import { route } from '@shared/route'

import { CustomContext } from '../types/types'

import { sendEmail } from './emailService'
import { renderTemplate } from './templateService'

const CONFIRMATION_TOKEN_EXPIRATION_HOURS = 24 // Token expires in 24 hours

/**
 * Generate an email confirmation token and send an email to the new user.
 * @param userId - The ID of the user to confirm.
 * @param email - The user's email to send the confirmation link to.
 * @param context - The context to access the repositories.
 */
export const requestEmailVerification = async (
  userId: number,
  email: string,
  context: CustomContext
): Promise<void> => {
  const { emailConfirmationTokenRepository } = context
  // Generate a confirmation token
  const token = crypto.randomBytes(32).toString('hex')

  // Set expiration time
  const expiresAt = addHours(new Date(), CONFIRMATION_TOKEN_EXPIRATION_HOURS)

  // Store the token in the email_confirmation_tokens table
  await emailConfirmationTokenRepository.createToken({
    userId,
    token,
    expiresAt,
  })
  const user = await context.userRepository.getUserById(userId)
  if (!user) {
    throw new Error('Záznam uživatele nebyl nalezen')
  }
  // Generate the confirmation link
  const baseUrl = `${process.env.APP_BASE_URL_FRONTEND}`
  const confirmationLink = `${baseUrl}${route.emailVerification()}?token=${token}`
  // Render the template
  const html = await renderTemplate('emailConfirmation', {
    userDisplayName: user.displayName,
    confirmationLink,
  })

  // Send the email with the confirmation link
  await sendEmail({
    to: email,
    subject: 'Žádost o ověření e-mailu',
    html,
  })
}

/**
 * Validate the confirmation token and confirm the user's email.
 * @param token - The confirmation token provided by the user.
 * @param context - The context to access the repositories.
 */
export const verifyEmail = async (
  token: string,
  context: CustomContext
): Promise<void> => {
  const { userRepository, emailConfirmationTokenRepository } = context

  // Find the confirmation token in the database
  const confirmationTokenRecord =
    await emailConfirmationTokenRepository.getToken(token)
  if (
    !confirmationTokenRecord ||
    confirmationTokenRecord.expiresAt < new Date()
  ) {
    throw new Error(
      'Chybný či vypršelý ověřovací token. Zkuste to prosím znovu.'
    )
  }

  // Find the user associated with the confirmation token
  const userRecord = await userRepository.getUserById(
    confirmationTokenRecord.userId
  )
  if (!userRecord) {
    throw new Error('User not found')
  }

  await userRepository.updateUserById(userRecord.id, { confirmed: true })

  // Delete the confirmation token after it's used
  await emailConfirmationTokenRepository.deleteTokenById(
    confirmationTokenRecord.id
  )
}

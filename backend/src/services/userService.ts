import crypto from 'crypto'
import { addHours } from 'date-fns'

import { createToken } from '../libs/jwt'
import { CustomContext } from '../types/types'

import { sendEmail } from './emailService'
import { comparePassword, hashPassword } from './passwordHashService'

export interface AuthResponse {
  userId: number
  token: string
}

const RESET_TOKEN_EXPIRATION_HOURS = 1 // Token expires in 1 hour

/**
 * Login a user and return an authentication token.
 * @param login - The user's email or login.
 * @param password - The user's password.
 * @param context - The context to access the user repository.
 * @returns {Promise<AuthResponse>}
 */
export async function loginUser(
  login: string,
  password: string,
  context: CustomContext
): Promise<AuthResponse> {
  const { userRepository } = context
  const errorMessage = 'Invalid email or password'

  // Find user by email
  const foundUser = await userRepository.getUserByEmail(login.toLowerCase())
  if (!foundUser) throw new Error(errorMessage)

  // Validate password
  const isPasswordValid = await comparePassword(password, foundUser.password)
  if (!isPasswordValid) throw new Error(errorMessage)

  // Generate a JWT token for the user
  const token = createToken({ userId: foundUser.id })
  return { userId: foundUser.id, token }
}

/**
 * Register a new user with email and password.
 * @param email - The email to register.
 * @param password - The password for the new user.
 * @param context - The context to access the user repository.
 * @returns {Promise<User>}
 */
export async function registerUser(
  email: string,
  password: string,
  context: CustomContext
) {
  const { userRepository } = context

  // Check if email is already in use
  const existingUser = await userRepository.getUserByEmail(email.toLowerCase())
  if (existingUser) throw new Error('User with this email already exists')

  // Hash the password and create the user
  const hashedPassword = await hashPassword(password)
  const userId = await userRepository.createUser({
    email,
    password: hashedPassword,
  })

  // Return the newly created user
  return await userRepository.getUserById(userId)
}

/**
 * Change password for the authenticated user.
 * @param userId - The ID of the user requesting password change.
 * @param oldPassword - The current password for validation.
 * @param newPassword - The new password to be set.
 * @param context - The context to access repositories.
 * @returns {Promise<void>}
 */
export async function changeUserPassword(
  userId: number,
  oldPassword: string,
  newPassword: string,
  context: CustomContext
): Promise<void> {
  const { userRepository } = context

  // Fetch user to verify old password
  const userRecord = await userRepository.getUserById(userId)
  if (!userRecord) {
    throw new Error('User not found')
  }

  // Validate old password
  const isOldPasswordCorrect = await comparePassword(
    userRecord.password,
    oldPassword
  )
  if (!isOldPasswordCorrect) {
    throw new Error('Old password is incorrect')
  }

  // Hash the new password and update it
  const newPasswordHash = await hashPassword(newPassword)
  await userRepository.updatePassword(userId, newPasswordHash)
}

/**
 * Fetch user details by ID.
 * @param userId - The ID of the user.
 * @param context - The context to access the user repository.
 * @returns {Promise<User | null>}
 */
export async function getUserById(userId: number, context: CustomContext) {
  const { userRepository } = context
  return await userRepository.getUserById(userId)
}

// Function to request a password reset
export async function requestPasswordReset(
  email: string,
  context: CustomContext
): Promise<void> {
  const { userRepository, passwordResetTokenRepository } = context

  const userRecord = await userRepository.getUserByEmail(email)
  if (!userRecord) {
    return
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = addHours(new Date(), RESET_TOKEN_EXPIRATION_HOURS)

  await passwordResetTokenRepository.createToken({
    userId: userRecord.id,
    token,
    expiresAt,
  })

  const resetLink = `https://your-app/reset-password?token=${token}`

  await sendEmail({
    to: userRecord.email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
  })
}

// Function to reset password
export async function resetPassword(
  token: string,
  newPassword: string,
  context: CustomContext
): Promise<void> {
  const { passwordResetTokenRepository, userRepository } = context

  const resetToken = await passwordResetTokenRepository.getToken(token)
  if (!resetToken) throw new Error('Invalid or expired reset token')

  const hashedPassword = await hashPassword(newPassword)
  await userRepository.updatePassword(resetToken.userId, hashedPassword)
  await passwordResetTokenRepository.deleteTokenById(resetToken.id)
}

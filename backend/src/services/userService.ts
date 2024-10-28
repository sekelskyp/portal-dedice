import { createToken } from '../libs/jwt'
import { CustomContext } from '../types/types'

import {
  requestEmailVerification,
  verifyEmail,
} from './emailConfirmationService'
import { comparePassword, hashPassword } from './passwordHashService'
import { requestPasswordReset, resetPassword } from './passwordResetService'

export interface AuthResponse {
  userId: number
  token: string
}

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
  const { userRepository, beneficiaryRepository } = context
  console.log('registerUser')
  // Check if email is already in use
  const existingUser = await userRepository.getUserByEmail(email.toLowerCase())
  if (existingUser) throw new Error('User with this email already exists')

  // Hash the password and create the user
  const hashedPassword = await hashPassword(password)
  const userId = await userRepository.createUser({
    email,
    password: hashedPassword,
  })
  const newUser = await userRepository.getUserById(userId)
  if (!newUser) {
    throw new Error('Failed to retrieve the newly created user')
  }
  // Create a beneficiary record linked to the new user
  await beneficiaryRepository.createBeneficiary({
    userId: newUser.id,
  })
  await sendEmailVerification(newUser.id, email, context)
  return newUser
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

// Function to initiate password reset
export async function initiatePasswordReset(
  email: string,
  context: CustomContext
): Promise<void> {
  await requestPasswordReset(email, context) // Using the PasswordResetService function here
}

// Function to complete password reset with token and new password
export async function completePasswordReset(
  token: string,
  newPassword: string,
  context: CustomContext
): Promise<void> {
  await resetPassword(token, newPassword, context) // Using the PasswordResetService function here
}

/**
 * Send an email verification request to a new user.
 * @param userId - The ID of the user to confirm.
 * @param email - The user's email to send the confirmation link to.
 * @param context - The context to access the repositories.
 * @returns {Promise<void>}
 */
async function sendEmailVerification(
  userId: number,
  email: string,
  context: CustomContext
): Promise<void> {
  await requestEmailVerification(userId, email, context) // Calls emailConfirmationService to generate and send token
}

/**
 * Confirm the user's email using a token.
 * @param token - The confirmation token provided by the user.
 * @param context - The context to access the repositories.
 * @returns {Promise<void>}
 */
export async function confirmEmailVerification(
  token: string,
  context: CustomContext
): Promise<void> {
  await verifyEmail(token, context) // Calls emailConfirmationService to validate and confirm email
}

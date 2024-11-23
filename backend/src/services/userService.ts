import { UserEntity } from '@backend/graphql/modules/user/userRepository'
import { GenderEnumType } from '@shared/enums'

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

interface registerUserInput {
  email: string
  password: string
  name: string
  surname: string
}

interface UserProfileInput {
  name?: string
  surname?: string
  displayName?: string
  sendNotifications?: boolean
  gender?: GenderEnumType
  phone?: string
  street?: string
  streetNumber?: string
  municipality?: string
  postalCode?: string
}

export async function loginUser(
  login: string,
  password: string,
  context: CustomContext
): Promise<AuthResponse> {
  const { userRepository } = context
  const errorMessage = 'Neplatný e-mail nebo heslo'

  // Find user by email
  const foundUser = await userRepository.getUserByEmail(login.toLowerCase())
  if (!foundUser) throw new Error(errorMessage)

  // Validate password
  const isPasswordValid = await comparePassword(password, foundUser.password)
  if (!isPasswordValid) throw new Error(errorMessage)

  // Check if user is confirmed
  if (!foundUser.confirmed)
    throw new Error('Pro login je nutné ověřit e-mail uživatele')

  // Generate a JWT token for the user
  const token = createToken({ userId: foundUser.id })
  return { userId: foundUser.id, token }
}

// Register a new user with email and password.
export async function registerUser(
  data: registerUserInput,
  context: CustomContext
): Promise<UserEntity> {
  const { userRepository } = context

  // Check if email is already in use
  const existingUser = await userRepository.getUserByEmail(
    data.email.toLowerCase()
  )
  if (existingUser) throw new Error('Uživatel s tímto emailem již existuje')

  // Hash the password and create the user
  const hashedPassword = await hashPassword(data.password)
  const displayName = `${data.name} ${data.surname}`
  const userId = await userRepository.createUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    surname: data.surname,
    displayName,
    type: 'User',
  })
  const newUser = await userRepository.getUserById(userId)
  if (!newUser) {
    throw new Error('Failed to retrieve the newly created user')
  }
  await sendEmailVerification(newUser.id, data.email, context)
  return newUser
}

// Change password for the authenticated user.
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
    throw new Error('Uživatel nebyl nalezen.')
  }

  // Validate old password
  const isOldPasswordCorrect = await comparePassword(
    userRecord.password,
    oldPassword
  )
  if (!isOldPasswordCorrect) {
    throw new Error('Nesprávné staré heslo.')
  }

  // Hash the new password and update it
  const newPasswordHash = await hashPassword(newPassword)
  await userRepository.updateUserById(userId, { password: newPasswordHash })
}

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

// Send an email verification request to a new user.
async function sendEmailVerification(
  userId: number,
  email: string,
  context: CustomContext
): Promise<void> {
  await requestEmailVerification(userId, email, context) // Calls emailConfirmationService to generate and send token
}

//Confirm the user's email using a token.
export async function confirmEmailVerification(
  token: string,
  context: CustomContext
): Promise<void> {
  await verifyEmail(token, context) // Calls emailConfirmationService to validate and confirm email
}

export async function updateProfile(
  userId: number,
  data: UserProfileInput,
  context: CustomContext
): Promise<UserEntity> {
  const { userRepository } = context

  const user = await userRepository.getUserById(userId)
  if (!user) {
    throw new Error('Uživatel nebyl nalezen.')
  }
  // Ensure that the display name is updated if the name or surname is updated
  data.displayName = data.displayName || `${data.name} ${data.surname}`
  await userRepository.updateUserById(userId, data)
  const updatedUser = await userRepository.getUserById(userId)
  if (!updatedUser) {
    throw new Error('Uživatel nebyl nalezen po aktualizaci profilu.')
  }
  return updatedUser
}

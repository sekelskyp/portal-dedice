import { User } from '@backend/graphql/modules/user/userType'

import { createToken } from '../libs/jwt'
import { CustomContext } from '../types/types' // Assuming CustomContext is defined

import { comparePassword, hashPassword } from './passwordHashService'

export interface LoginResponse {
  token: string
  user: User
}

/**
 * Service to log in a user by verifying the password and generating a JWT token
 * @param login - The login provided by the user
 * @param password - The password provided by the user (in plain text)
 * @param context - The GraphQL context containing the db connection
 * @returns A LoginResponse object with JWT token and user info
 */
export const loginUser = async (
  login: string,
  password: string,
  context: CustomContext // Pass context containing the db
): Promise<LoginResponse> => {
  const { db } = context // Get the db from the context

  // Find the user in the database by login
  const user = await db.user.findUnique({ where: { login } })

  if (!user) {
    throw new Error('User not found')
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await comparePassword(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  // Generate a JWT token
  const token = createToken({ userId: user.id })

  // Return both the token and the user data
  return {
    token,
    user,
  }
}

/**
 * Service to register a new user
 * @param login - The login provided by the user (email or username)
 * @param password - The password provided by the user (in plain text)
 * @param context - The GraphQL context containing the db connection
 * @returns The newly created user object
 */
export const registerUser = async (
  login: string,
  password: string,
  context: CustomContext // Pass context containing the db
): Promise<User> => {
  const { db } = context // Get the db from the context

  // Check if the login (email) is already in use
  const existingUser = await db.user.findUnique({ where: { login } })
  if (existingUser) {
    throw new Error('Login already in use')
  }

  // Hash the password
  const hashedPassword = await hashPassword(password)

  // Save the new user with the hashed password
  const newUser = await db.user.create({
    data: {
      login, // Assuming "login" is the field for email
      password: hashedPassword, // Save the hashed password
    },
  })

  return newUser
}

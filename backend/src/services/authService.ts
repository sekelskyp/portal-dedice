import { and, eq } from 'drizzle-orm'

import { contact, lower, user } from '@backend/db/schema'
import { Contact } from '@backend/graphql/modules/user/contactType'
import { User } from '@backend/graphql/modules/user/userType'

import { AuthInfo, RegisterInput } from '../graphql/modules/auth/authType'
import { createToken } from '../libs/jwt'
import { CustomContext } from '../types/types'

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
  const userRecord = await db
    .select()
    .from(user)
    .where(eq(lower(user.login), login.toLowerCase()))

  if (!userRecord) {
    throw new Error('User not found')
  }
  const foundUser = userRecord[0]
  // Compare the provided password with the stored hashed password
  const isPasswordValid = await comparePassword(password, foundUser.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  // Generate a JWT token
  const token = createToken({ userId: user.id })

  // Return both the token and the user data
  return {
    user: { ...foundUser },
    token,
  }
}

export const registerUser = async (
  registerInput: RegisterInput,
  context: CustomContext // Pass context containing the db
): Promise<User> => {
  const { db } = context // Get the db from the context

  // Check if the login (email) is already in use
  const existingUserRecord = await db
    .select()
    .from(user)
    .where(eq(lower(user.login), registerInput.contact.email.toLowerCase()))

  if (existingUserRecord) {
    throw new Error('Login already in use')
  }

  // Hash the password
  const hashedPassword = await hashPassword(registerInput.password)

  const contactRecord = await db
    .insert(contact)
    .values({
      name: registerInput.contact.name,
      surname: registerInput.contact.surname,
      dateOfBirth: registerInput.contact.dateOfBirth,
      gender: registerInput.contact.gender,
      email: registerInput.contact.email,
      country: registerInput.contact.country,
      city: registerInput.contact.city,
      street: registerInput.contact.street,
      postalCode: registerInput.contact.postalCode,
    })
    .$returningId()

  const contactRecordId = contactRecord[0].id

  const userRecord = await db
    .insert(user)
    .values({
      contactId: contactRecordId,
      login: registerInput.login,
      password: hashedPassword,
    })
    .$returningId()

  /* ASSEMBLE MUTATION RESPONSE */

  return { id: userRecord[0].id, contactId: userRecord[0].conta }
}

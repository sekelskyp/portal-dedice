import { eq } from 'drizzle-orm'

import { contact, lower, user } from '@backend/db/schema'

import { createToken } from '../libs/jwt'
import { CustomContext } from '../types/types'

import { comparePassword, hashPassword } from './passwordHashService'

export interface AuthResponse {
  userId: number
  token: string
}

export interface RegisterUserDTO {
  login: string
  password: string
  contact: {
    name: string
    surname: string
    dateOfBirth: Date
    gender: string
    phone: string
    email: string
    country: string
    city: string
    street: string
    postalCode: string
  }
}

export const loginUser = async (
  login: string,
  password: string,
  context: CustomContext
): Promise<AuthResponse> => {
  const { db } = context // Get the db from the context

  // Find the user in the database by login
  const userRecord = await db
    .select()
    .from(user)
    .where(eq(lower(user.login), login.toLowerCase()))

  if (userRecord.length === 0) {
    throw new Error('Invalid credentials')
  }

  const foundUser = userRecord[0]

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await comparePassword(password, foundUser.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  // Generate a JWT token
  const token = createToken({ userId: foundUser.id })

  // Return only userId and token
  return {
    userId: foundUser.id,
    token,
  }
}

export const registerUser = async (
  input: RegisterUserDTO,
  context: CustomContext // Pass context containing the db
): Promise<AuthResponse> => {
  const { db } = context // Get the db from the context

  // Check if the login (email) is already in use
  const existingUserRecord = await db
    .select()
    .from(user)
    .where(eq(lower(user.login), input.login.toLowerCase()))

  if (existingUserRecord.length > 0) {
    throw new Error('Login already in use')
  }

  // Hash the password
  const hashedPassword = await hashPassword(input.password)
  const contactRecord = await db
    .insert(contact)
    .values({
      name: input.contact.name,
      surname: input.contact.surname,
      dateOfBirth: input.contact.dateOfBirth,
      gender: input.contact.gender,
      email: input.contact.email,
      country: input.contact.country,
      city: input.contact.city,
      street: input.contact.street,
      postalCode: input.contact.postalCode,
    })
    .$returningId()

  const contactRecordId = contactRecord[0].id

  const userRecord = await db
    .insert(user)
    .values({
      contactId: contactRecordId,
      login: input.login,
      password: hashedPassword,
    })
    .$returningId()

  // Generate a JWT token
  const token = createToken({ userId: userRecord[0].id })

  return { userId: userRecord[0].id, token: token }
}

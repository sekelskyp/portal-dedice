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
}

export const loginUser = async (
  login: string,
  password: string,
  context: CustomContext
): Promise<AuthResponse> => {
  const { userRepository } = context
  const incorrectCredentialsErrorMsg = 'Nesprávný email nebo heslo'

  // Find the user in the database by login
  const foundUser = await userRepository.getUserByEmail(login.toLowerCase())
  if (!foundUser) {
    throw new Error(incorrectCredentialsErrorMsg)
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await comparePassword(password, foundUser.password)
  if (!isPasswordValid) {
    throw new Error(incorrectCredentialsErrorMsg)
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
  context: CustomContext
) => {
  const { userRepository } = context

  // Check if the login (email) is already in use
  const existingUser = await userRepository.getUserByEmail(
    input.login.toLowerCase()
  )
  if (existingUser) {
    throw new Error('Uživatel s tímto emailem již existuje')
  }

  // Hash the password
  const hashedPassword = await hashPassword(input.password)

  // Create the user
  const userId = await userRepository.createUser({
    email: input.login,
    password: hashedPassword,
  })

  if (!userId) {
    throw new Error('Nastala chyba při vytváření uživatele')
  }

  // Fetch and return the newly created user
  return await userRepository.getUserById(userId)
}

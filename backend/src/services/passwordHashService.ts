import { hash, verify } from 'argon2'

/**
 * Hashes a plain text password to be stored in the database using Argon2
 * @param password - The plain text password to be hashed
 * @returns The hashed password as a string
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password)
}

/**
 * Compares a plain text password with a hashed password from the database
 * @param password - The plain text password entered by the user
 * @param hash - The hashed password stored in the database
 * @returns True if passwords match, false otherwise
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await verify(hash, password)
}

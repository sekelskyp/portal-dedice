import bcrypt from 'bcrypt'

const saltRounds = 10

/**
 * Hashes a plain text password to be stored in the database
 * @param password - The plain text password to be hashed
 * @returns The hashed password as a string
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds)
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
  return await bcrypt.compare(password, hash)
}

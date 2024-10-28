import { eq, inArray } from 'drizzle-orm'

import { notary, user } from '@backend/db/schema'
import { type Db } from '@backend/types/types'

export interface User {
  id: number
  email: string
  password: string
  confirmed: boolean | null
}

export interface UserUpdateData {
  email: string
  password: string
  confirmed: boolean | null
}

export function getUserRepository(db: Db) {
  async function getUserById(id: number): Promise<User | null> {
    const [result] = await db.select().from(user).where(eq(user.id, id))
    return result
  }

  async function getUsersByIds(ids: number[]): Promise<User[]> {
    const results = await db.select().from(user).where(inArray(user.id, ids))
    return results
  }

  async function getAllUsers(): Promise<User[]> {
    const results = await db.select().from(user)
    return results
  }

  async function getUserByNotaryId(notaryId: number): Promise<User | null> {
    const [result] = await db
      .select()
      .from(user)
      .innerJoin(notary, eq(user.id, notary.userId))
      .where(eq(notary.id, notaryId))

    return result ? result.user : null
  }

  async function createUser({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<number> {
    const resultingIds = await db
      .insert(user)
      .values({ email, password })
      .$returningId()

    return resultingIds[0].id
  }

  async function getUserByEmail(email: string): Promise<User | null> {
    const [result] = await db.select().from(user).where(eq(user.email, email))
    return result || null
  }

  // Update user's password
  async function updatePassword(userId: number, hashedPassword: string) {
    await db
      .update(user)
      .set({ password: hashedPassword })
      .where(eq(user.id, userId))
  }

  async function updateUser(
    userId: number,
    data: Partial<UserUpdateData>
  ): Promise<void> {
    await db.update(user).set(data).where(eq(user.id, userId))
  }

  return {
    getUserById,
    getUsersByIds,
    getAllUsers,
    createUser,
    getUserByNotaryId,
    getUserByEmail,
    updatePassword,
    updateUser,
  }
}

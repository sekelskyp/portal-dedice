import { eq, inArray } from 'drizzle-orm'

import { notary, user } from '@backend/db/schema'
import { type Db } from '@backend/types/types'

export interface User {
  id: number
  email: string
  password: string
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

  return {
    getUserById,
    getUsersByIds,
    getAllUsers,
    createUser,
    getUserByNotaryId,
  }
}

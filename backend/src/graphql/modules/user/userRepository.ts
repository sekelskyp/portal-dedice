import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { user } from '@backend/db/schema'
import { type Db } from '@backend/types/types'

export interface UserEntity extends InferSelectModel<typeof user> {}
export interface UserInsertInput
  extends InferInsertModel<Omit<typeof user, 'id'>> {}

export function getUserRepository(db: Db) {
  async function getUserById(id: number): Promise<UserEntity | null> {
    const [result] = await db.select().from(user).where(eq(user.id, id))
    return result
  }

  async function getUsersByIds(ids: number[]): Promise<UserEntity[]> {
    const results = await db.select().from(user).where(inArray(user.id, ids))
    return results
  }

  async function createUser(data: UserInsertInput): Promise<number> {
    const resultingIds = await db.insert(user).values(data).$returningId()

    return resultingIds[0].id
  }

  async function getUserByEmail(email: string): Promise<UserEntity | null> {
    const [result] = await db.select().from(user).where(eq(user.email, email))
    return result || null
  }

  async function updateUserById(
    id: number,
    data: Partial<UserInsertInput>
  ): Promise<void> {
    await db.update(user).set(data).where(eq(user.id, id))
  }

  async function deleteUsersByIds(ids: number[]): Promise<void> {
    await db.delete(user).where(inArray(user.id, ids))
  }

  async function getUserByNotaryId(notaryId: number): Promise<UserEntity> {
    const [result] = await db
      .select()
      .from(user)
      .where(eq(user.notaryId, notaryId))
    return result
  }

  return {
    getUserById,
    getUsersByIds,
    createUser,
    getUserByEmail,
    updateUserById,
    deleteUsersByIds,
    getUserByNotaryId,
  }
}

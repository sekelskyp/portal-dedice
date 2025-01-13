import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { user } from '@backend/db/schema'
import { type Db } from '@backend/types/types'
import { UserTypeEnumType } from '@shared/enums'

export interface UserEntity extends InferSelectModel<typeof user> {}
export interface UserInsertInput
  extends InferInsertModel<Omit<typeof user, 'id'>> {}

export function getUserRepository(db: Db) {
  async function getUserById(id: number): Promise<UserEntity | null> {
    const [result] = await db.select().from(user).where(eq(user.id, id))
    return result || null
  }

  async function getUsersByIds(ids: number[]): Promise<UserEntity[]> {
    const results = await db.select().from(user).where(inArray(user.id, ids))
    return results
  }

  async function getAllUsersByType(
    type: UserTypeEnumType
  ): Promise<UserEntity[]> {
    const results = await db.select().from(user).where(eq(user.type, type))
    return results
  }

  async function createUser(data: UserInsertInput): Promise<number> {
    const resultingIds = await db.insert(user).values(data).$returningId()
    return resultingIds[0].id
  }

  async function createUsers(data: UserInsertInput[]): Promise<number[]> {
    const resultingIds = await db.insert(user).values(data).$returningId()
    return resultingIds.map((result) => result.id)
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

  async function getUserByNotaryId(
    notaryId: number
  ): Promise<UserEntity | null> {
    const [result] = await db
      .select()
      .from(user)
      .where(eq(user.notaryId, notaryId))
    return result || null
  }

  async function getAllUsers(): Promise<UserEntity[]> {
    const results = await db.select().from(user)
    return results
  }

  async function toggleUserConfirmation(
    id: number
  ): Promise<UserEntity | null> {
    const currentUser = await getUserById(id)
    if (!currentUser) return null

    await db
      .update(user)
      .set({ confirmed: !currentUser.confirmed })
      .where(eq(user.id, id))

    return await getUserById(id)
  }

  return {
    getUserById,
    getAllUsersByType,
    getUsersByIds,
    createUser,
    createUsers,
    getUserByEmail,
    updateUserById,
    deleteUsersByIds,
    getUserByNotaryId,
    getAllUsers,
    toggleUserConfirmation,
  }
}

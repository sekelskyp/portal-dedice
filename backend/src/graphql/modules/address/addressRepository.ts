import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { address } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface AddressEntity extends InferSelectModel<typeof address> {} // Represents a database row
export interface AddressInsertInput
  extends InferInsertModel<Omit<typeof address, 'id'>> {} // Represents input data for insert operations

export function getAddressRepository(db: Db) {
  // Create a new Address
  async function createAddress(data: AddressInsertInput): Promise<number> {
    const [result] = await db.insert(address).values(data).$returningId()
    return result.id
  }

  async function createAddresses(
    data: AddressInsertInput[]
  ): Promise<number[]> {
    const result = await db.insert(address).values(data).$returningId()
    return result.map((r) => r.id)
  }

  // Get an Address by ID
  async function getAddressById(id: number): Promise<AddressEntity | null> {
    const [result] = await db.select().from(address).where(eq(address.id, id))
    return result || null
  }

  // Get Addresses by their IDs
  async function getAddressesByIds(ids: number[]): Promise<AddressEntity[]> {
    return await db.select().from(address).where(inArray(address.id, ids))
  }

  // Update an existing Address
  async function updateAddressById(
    id: number,
    data: Partial<AddressInsertInput>
  ): Promise<void> {
    await db.update(address).set(data).where(eq(address.id, id))
  }

  // Delete an Address by ID
  async function deleteAddressesByIds(ids: number[]): Promise<void> {
    await db.delete(address).where(inArray(address.id, ids))
  }

  return {
    createAddresses,
    getAddressById,
    getAddressesByIds,
    createAddress,
    deleteAddressesByIds,
    updateAddressById,
  }
}

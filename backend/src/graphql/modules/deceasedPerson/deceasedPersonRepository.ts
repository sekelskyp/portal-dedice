import { eq } from 'drizzle-orm'

import { deceasedPerson } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface DeceasedPersonData {
  dateOfBirth: Date
  dateOfDeath: Date
  contactId: number
}

export function getDeceasedPersonRepository(db: Db) {
  // Get Deceased Person by ID
  async function getDeceasedPersonById(id: number) {
    const [result] = await db
      .select()
      .from(deceasedPerson)
      .where(eq(deceasedPerson.id, id))
    return result
  }

  // Get all Deceased Persons
  async function getAllDeceasedPersons() {
    return await db.select().from(deceasedPerson)
  }

  // Create Deceased Person
  async function createDeceasedPerson(data: DeceasedPersonData) {
    const [result] = await db.insert(deceasedPerson).values(data).$returningId()
    return result.id
  }

  // Update Deceased Person
  async function updateDeceasedPerson(
    id: number,
    data: Partial<DeceasedPersonData>
  ) {
    await db.update(deceasedPerson).set(data).where(eq(deceasedPerson.id, id))
    return id
  }

  // Delete Deceased Person
  async function deleteDeceasedPersonById(id: number) {
    const [result] = await db
      .select()
      .from(deceasedPerson)
      .where(eq(deceasedPerson.id, id))
    await db.delete(deceasedPerson).where(eq(deceasedPerson.id, id))
    return result?.id || null
  }

  return {
    getDeceasedPersonById,
    getAllDeceasedPersons,
    createDeceasedPerson,
    updateDeceasedPerson,
    deleteDeceasedPersonById,
  }
}

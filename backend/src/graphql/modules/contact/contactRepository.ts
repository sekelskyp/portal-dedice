import { eq } from 'drizzle-orm'

import { contact, GenderEnumType, notary } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface ContactData {
  name: string
  surname: string
  displayName?: string
  phone?: string
  gender?: GenderEnumType
  email?: string
  completeAddress: string
  postalCode: string
}

export function getContactRepository(db: Db) {
  async function getContactById(id: number) {
    const [result] = await db.select().from(contact).where(eq(contact.id, id))
    return result
  }

  async function getAllContacts() {
    return await db.select().from(contact)
  }

  async function createContact(data: ContactData): Promise<number> {
    const [result] = await db.insert(contact).values(data).$returningId()
    return result.id
  }

  async function createContacts(data: ContactData[]): Promise<number[]> {
    const results = await db.insert(contact).values(data).$returningId()
    return results.map((contact) => contact.id)
  }

  async function deleteContactById(id: number): Promise<number> {
    const [result] = await db.select().from(contact).where(eq(contact.id, id))
    await db.delete(contact).where(eq(contact.id, id))
    return result.id
  }

  async function getContactByNotaryId(notaryId: number) {
    const [result] = await db
      .select()
      .from(contact)
      .innerJoin(notary, eq(notary.contactId, contact.id))
      .where(eq(notary.id, notaryId))

    return result ? result.contact : null
  }

  return {
    getContactById,
    getAllContacts,
    createContact,
    deleteContactById,
    getContactByNotaryId,
    createContacts,
  }
}

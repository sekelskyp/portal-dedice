import { eq, inArray } from 'drizzle-orm'

import { Db } from '@backend/types/types'

import { contact, GenderEnumType, notary } from '../../../db/schema'

export interface ContactData {
  name: string
  surname: string
  displayName?: string
  phone?: string
  gender?: GenderEnumType
  email?: string
  completeAddress?: string
  postalCode?: string
}

function getDefaultDisplayName(data: ContactData): string {
  return data.displayName || `${data.name} ${data.surname}`
}

export function getContactRepository(db: Db) {
  async function getContactById(id: number) {
    const [result] = await db.select().from(contact).where(eq(contact.id, id))
    return result
  }

  async function getContactsByIds(id: number[]) {
    const result = await db
      .select()
      .from(contact)
      .where(inArray(contact.id, id))
    return result
  }

  async function getAllContacts() {
    return await db.select().from(contact)
  }

  async function createContact(data: ContactData): Promise<number> {
    const contactData = {
      ...data,
      displayName: data.displayName || getDefaultDisplayName(data),
    }
    const [result] = await db.insert(contact).values(contactData).$returningId()
    return result.id
  }

  function createContacts(data: ContactData[]): Promise<number[]> {
    return Promise.all(data.map((d) => createContact(d)))
  }

  async function deleteContactById(id: number): Promise<number> {
    const [result] = await db.select().from(contact).where(eq(contact.id, id))
    await db.delete(contact).where(eq(contact.id, id))
    return result.id
  }

  async function deleteContactsByIds(ids: number[]): Promise<void> {
    await db.delete(contact).where(inArray(contact.id, ids))
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
    getContactsByIds,
    getAllContacts,
    createContact,
    deleteContactById,
    deleteContactsByIds,
    getContactByNotaryId,
    createContacts,
  }
}

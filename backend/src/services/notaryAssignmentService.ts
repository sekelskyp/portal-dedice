import { getConnection } from '../db/db'
import { Contact, Notary } from '../types/types' // Assuming these types are defined

/**
 * Service to fetch the notary based on the contact's region or address.
 * @param contact - The contact object containing relevant address information.
 * @returns The assigned notary based on the contact's region.
 */
export const getNotaryByContactAddress = async (
  contact: Contact
): Promise<Notary | null> => {
  const { db } = await getConnection()

  // Use the contact object directly, assuming contact has a "region" field
  if (!contact.region) {
    throw new Error('Contact does not have region information')
  }

  // Fetch the notary based on the contact's region
  const notary = await db.notary.findFirst({
    where: { region: contact.region },
  })

  if (!notary) {
    throw new Error('No notary found for this region')
  }

  return notary
}

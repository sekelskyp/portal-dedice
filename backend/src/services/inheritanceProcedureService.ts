import { InheritanceProcedureStateEnumType } from '@backend/db/schema'

import { CustomContext } from '../types/types'

import { sendEmail } from './emailService'
import { findAvailableNotary } from './notaryAssignmentService'
import { renderTemplate } from './templateService'

export interface InheritanceProcedureData {
  notaryId?: number | null
  state?: InheritanceProcedureStateEnumType
  startDate: Date
  endDate?: Date | null
  mainContactId?: number | null
  deceasedContactId: number
  deceasedDateOfBirth?: Date | null
  deceasedDateOfDeath?: Date | null
}

interface InheritanceProcedureFormData {
  beneficiaryId: number
  deceasedPerson: {
    name: string
    surname: string
    dateOfBirth: Date
    dateOfDeath: Date
    completeAddress: string
  }
  contactPerson: {
    name: string
    surname: string
    email: string
  }
  beneficiaries: {
    name: string
    surname: string
    email: string
  }[]
}

// Private helper function to generate a unique name for a new procedure
function generateProcedureName(
  name: string,
  surname: string,
  startDate: Date
): string {
  const formattedDate = startDate.toISOString().split('T')[0].replace(/-/g, '_')
  const initialName = name[0].toUpperCase()
  const initialsSurname = surname.slice(0, 2).toUpperCase()

  return `${formattedDate}_${initialName}${initialsSurname}`
}

function extractAndFormatCzechPostalCode(
  completeAddress: string
): string | null {
  // Match the Czech postal code format of 5 digits, with an optional space between the third and fourth digits
  const postalCodeMatch = completeAddress.match(/\b\d{3} ?\d{2}\b/)

  // If a match is found, format it to include a space between the third and fourth digits
  if (postalCodeMatch) {
    const formattedPostalCode = postalCodeMatch[0].replace(
      /(\d{3}) ?(\d{2})/,
      '$1 $2'
    )
    return formattedPostalCode
  }

  // Return null if no postal code is found in the expected format
  return null
}

// Function to create a new procedure
export async function createProcedure(
  data: InheritanceProcedureData,
  context: CustomContext
): Promise<number> {
  const { inheritanceProcedureRepository, contactRepository } = context
  const deceasedContact = await contactRepository.getContactById(
    data.deceasedContactId
  )
  if (!deceasedContact) {
    throw new Error('Deceased contact not found')
  }
  const procedureName = generateProcedureName(
    deceasedContact.name,
    deceasedContact.surname,
    data.startDate
  )

  const procedureId = await inheritanceProcedureRepository.createProcedure({
    ...data,
    name: procedureName,
  })
  await context.chatRepository.createChat({
    inheritanceProcedureId: procedureId.id,
  })

  return procedureId.id
}

// Function to close an existing procedure
export async function closeProcedure(
  procedureId: number,
  context: CustomContext
): Promise<void> {
  const { inheritanceProcedureRepository } = context

  // Retrieve the procedure by ID to check its current state
  const procedure =
    await inheritanceProcedureRepository.getProcedureById(procedureId)

  // Check if the procedure is in an "open" state
  if (!procedure || procedure.state !== 'InProgress') {
    throw new Error('Only an open procedure can be closed')
  }

  // Proceed to close the procedure if it is "InProgress"
  const now = new Date()
  await inheritanceProcedureRepository.updateProcedure(procedureId, {
    state: 'Closed',
    endDate: now,
  })
}

export async function addBeneficiaryToProcedure(
  procedureId: number,
  beneficiaryId: number,
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context
  await beneficiaryRepository.insertBeneficiaryProcedureRelation({
    inheritanceProcedureId: procedureId,
    beneficiaryId,
  })
}

export async function addBeneficiariesToProcedure(
  procedureId: number,
  beneficiaryIds: number[],
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context

  // Prepare the array of relation objects for bulk insertion
  const relations = beneficiaryIds.map((beneficiaryId) => ({
    inheritanceProcedureId: procedureId,
    beneficiaryId,
  }))

  // Call the repository method for bulk insertion
  await beneficiaryRepository.insertMultipleBeneficiaryProcedureRelations(
    relations
  )
}

// Remove a beneficiary from a procedure
export async function removeBeneficiaryFromProcedure(
  procedureId: number,
  beneficiaryId: number,
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context
  await beneficiaryRepository.deleteBeneficiaryProcedureRelations(
    procedureId,
    beneficiaryId
  )
}

export async function deleteProceduresByIds(
  ids: number[],
  context: CustomContext
): Promise<number[]> {
  const { inheritanceProcedureRepository, contactRepository } = context

  // Step 1: Fetch the procedures to get the associated contact IDs
  const procedures =
    await inheritanceProcedureRepository.getProceduresByIds(ids)

  // Step 2: Extract mainContactIds and deceasedContactIds
  const contactIdsToDelete = procedures.reduce<number[]>((acc, procedure) => {
    if (procedure.mainContactId) acc.push(procedure.mainContactId)
    if (procedure.deceasedContactId) acc.push(procedure.deceasedContactId)
    return acc
  }, [])

  // Step 4: Delete the associated contacts in bulk
  if (contactIdsToDelete.length > 0) {
    await contactRepository.deleteContactsByIds(contactIdsToDelete)
  }

  // Step 3: Delete the procedures
  const deletedIds =
    await inheritanceProcedureRepository.deleteProceduresByIds(ids)

  // Step 5: Return the array of deleted procedure IDs as confirmation
  return deletedIds
}

// Function to assign a notary to a procedure
export async function assignNotary(
  procedureId: number,
  notaryId: number,
  context: CustomContext
): Promise<void> {
  const { inheritanceProcedureRepository } = context
  await inheritanceProcedureRepository.updateProcedure(procedureId, {
    notaryId,
  })
}

export async function createProcedureFromFormData(
  data: InheritanceProcedureFormData,
  context: CustomContext
) {
  const {
    inheritanceProcedureRepository,
    contactRepository,
    beneficiaryRepository,
  } = context

  // Extract and validate the postal code from the deceased person's address
  const deceasedPostalCode = extractAndFormatCzechPostalCode(
    data.deceasedPerson.completeAddress
  )
  if (!deceasedPostalCode) {
    throw new Error(
      'Invalid or missing postal code in the deceased person address'
    )
  }

  // Create entries for the contact person and deceased person
  const [contactPersonId, deceasedContactId] =
    await contactRepository.createContacts([
      {
        name: data.contactPerson.name,
        surname: data.contactPerson.surname,
        email: data.contactPerson.email,
      },
      {
        name: data.deceasedPerson.name,
        surname: data.deceasedPerson.surname,
        completeAddress: data.deceasedPerson.completeAddress,
        postalCode: deceasedPostalCode,
      },
    ])

  // Create an inheritance procedure entry with main contact and deceased contact details
  const procedureId = await createProcedure(
    {
      mainContactId: contactPersonId,
      startDate: new Date(),
      deceasedContactId: deceasedContactId,
      deceasedDateOfBirth: data.deceasedPerson.dateOfBirth,
      deceasedDateOfDeath: data.deceasedPerson.dateOfDeath,
    },
    context
  )

  // Initialize relations list with the main beneficiary (the one who created the procedure)
  let beneficiaryProcedureRelations = [
    {
      inheritanceProcedureId: procedureId,
      beneficiaryId: data.beneficiaryId,
    },
  ]

  // If additional beneficiaries are provided, create their contacts and beneficiaries
  if (data.beneficiaries && data.beneficiaries.length > 0) {
    const beneficiaryContactsData = data.beneficiaries.map((beneficiary) => ({
      name: beneficiary.name,
      surname: beneficiary.surname,
      email: beneficiary.email,
    }))

    const otherBeneficiaryContactIds = await contactRepository.createContacts(
      beneficiaryContactsData
    )

    const allBeneficiaryData = data.beneficiaries.map((beneficiary, index) => ({
      name: beneficiary.name,
      surname: beneficiary.surname,
      email: beneficiary.email,
      contactId: otherBeneficiaryContactIds[index], // Link to corresponding contact
    }))

    const beneficiaryIds =
      await beneficiaryRepository.createBeneficiaries(allBeneficiaryData)

    // Add the newly created beneficiaries to the relations list
    beneficiaryProcedureRelations = beneficiaryProcedureRelations.concat(
      beneficiaryIds.map((beneficiaryId) => ({
        inheritanceProcedureId: procedureId,
        beneficiaryId: beneficiaryId,
      }))
    )
  }

  // Insert all beneficiary-procedure relations
  await beneficiaryRepository.insertMultipleBeneficiaryProcedureRelations(
    beneficiaryProcedureRelations
  )

  // Find an available notary based on postal code and date of death
  const [notary] = await findAvailableNotary(
    {
      postalCode: deceasedPostalCode,
      dateOfDeath: data.deceasedPerson.dateOfDeath,
    },
    context
  )

  // Assign the found notary to the procedure
  await assignNotary(procedureId, notary.id, context)

  // Return the created procedure with its details
  return await inheritanceProcedureRepository.getProcedureById(procedureId)
}

// Remove a beneficiary from a procedure
export async function notifyProcedureBeneficiaries(
  procedureId: number,
  subject: string,
  messageBody: string,
  context: CustomContext
): Promise<void> {
  const {
    beneficiaryRepository,
    contactRepository,
    inheritanceProcedureRepository,
  } = context

  // Fetch procedure
  const procedure =
    await inheritanceProcedureRepository.getProcedureById(procedureId)
  if (!procedure) {
    throw new Error('Procedure not found')
  }

  if (!procedure.notaryId) {
    throw new Error('Procedure not assigned to a notary')
  }

  // Fetch notary contact
  const notaryContact = await contactRepository.getContactByNotaryId(
    procedure.notaryId
  )
  if (!notaryContact) {
    throw new Error('Notary contact not found')
  }

  // Fetch all beneficiaries and their contacts in one go
  const beneficiaries =
    await beneficiaryRepository.getBeneficiariesByProcedureId(procedureId)
  const contactIds = beneficiaries
    .map((beneficiary) => beneficiary.beneficiary.contactId)
    .filter((contactId) => contactId !== null)

  const contacts = await contactRepository.getContactsByIds(contactIds) // Bulk fetch contacts
  const contactsMap = new Map(contacts.map((contact) => [contact.id, contact]))

  // Loop through beneficiaries and send notifications
  for (const beneficiary of beneficiaries) {
    const contactId = beneficiary.beneficiary.contactId
    if (!contactId) continue

    const contact = contactsMap.get(contactId)
    if (
      !beneficiary.beneficiary.sendNotifications ||
      !contact ||
      !contact.email
    )
      continue

    try {
      // Render the template
      const html = await renderTemplate('notification', {
        recipientName: contact.displayName,
        messageBody,
        procedureName: procedure.name,
        senderName: notaryContact.displayName,
        senderEmail: notaryContact.email,
      })

      // Send the email
      await sendEmail({
        to: contact.email,
        subject,
        html,
      })
    } catch (error) {
      console.error(
        `Failed to notify beneficiary ${contact.displayName}:`,
        error
      )
      continue // Continue notifying other beneficiaries
    }
  }
}

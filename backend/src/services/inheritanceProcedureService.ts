import { InheritanceProcedureStateEnumType } from '@backend/db/schema'

import { CustomContext } from '../types/types'

import { findAvailableNotary } from './notaryAssignmentService'

export interface InheritanceProcedureData {
  notaryId?: number | null
  mainBeneficiaryId?: number | null
  state?: InheritanceProcedureStateEnumType
  startDate: Date
  endDate?: Date | null
  deceasedContactId: number
  deceasedDateOfBirth?: Date | null
  deceasedDateOfDeath?: Date | null
}

interface InheritanceProcedureFormData {
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
  const deceasedPostalCode = extractAndFormatCzechPostalCode(
    data.deceasedPerson.completeAddress
  )
  if (!deceasedPostalCode) {
    throw new Error(
      'Invalid or missing postal code in the deceased person address'
    )
  }
  // Step 1: Create the Contact Person and Deceased Person entries
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

  // Step 2: Create the Inheritance Procedure entry
  const procedureId = await createProcedure(
    {
      deceasedContactId: deceasedContactId,
      startDate: new Date(),
      deceasedDateOfBirth: data.deceasedPerson.dateOfBirth,
      deceasedDateOfDeath: data.deceasedPerson.dateOfDeath,
    },
    context
  )

  // Step 3: Prepare contact data for other beneficiaries
  const beneficiaryContactsData = data.beneficiaries.map((beneficiary) => ({
    name: beneficiary.name,
    surname: beneficiary.surname,
    email: beneficiary.email,
  }))

  const otherBeneficiaryContactIds = await contactRepository.createContacts(
    beneficiaryContactsData
  )

  // Step 4: Create all beneficiaries, including the main beneficiary
  const allBeneficiaryData = [
    {
      name: data.contactPerson.name,
      surname: data.contactPerson.surname,
      email: data.contactPerson.email,
      contactId: contactPersonId, // Use the contactPersonId for the main beneficiary
    },
    ...data.beneficiaries.map((beneficiary, index) => ({
      name: beneficiary.name,
      surname: beneficiary.surname,
      email: beneficiary.email,
      contactId: otherBeneficiaryContactIds[index], // Other beneficiaries' contacts
    })),
  ]

  const beneficiaryIds =
    await beneficiaryRepository.createBeneficiaries(allBeneficiaryData)

  // Step 5: Link all beneficiaries to the procedure
  const beneficiaryProcedureRelations = beneficiaryIds.map((beneficiaryId) => ({
    inheritanceProcedureId: procedureId,
    beneficiaryId: beneficiaryId,
  }))

  await beneficiaryRepository.insertMultipleBeneficiaryProcedureRelations(
    beneficiaryProcedureRelations
  )
  // step 6 assign a notary to the procedure
  await inheritanceProcedureRepository.updateProcedure(procedureId, {
    mainBeneficiaryId: beneficiaryIds[0],
  })
  // step 7 find notary
  const [notary] = await findAvailableNotary(
    {
      postalCode: deceasedPostalCode,
      dateOfDeath: data.deceasedPerson.dateOfDeath,
    },
    context
  )
  // step 8 assign a notary to the procedure
  await assignNotary(procedureId, notary.id, context)
  // Return the created procedure
  return await inheritanceProcedureRepository.getProcedureById(procedureId)
}

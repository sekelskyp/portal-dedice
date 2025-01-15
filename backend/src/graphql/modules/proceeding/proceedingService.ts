import { BeneficiaryEntity } from '@backend/graphql/modules/beneficiary/beneficiaryRepository'
import { sendEmail } from '@backend/services/emailService'
import { findAvailableNotary } from '@backend/services/notaryAssignmentService'
import { renderTemplate } from '@backend/services/templateService'
import { CustomContext } from '@backend/types/types'

import {
  createAttachment,
  deleteAttachmentsByIds,
} from '../attachment/attachmentService'

const PROCEEDING_ATTACHMENT_LIMIT = 10

interface CreateProceedingData {
  startDate?: Date
  mainBeneficiaryUserId?: number
  beneficiaryUserIds: number[]
  deceasedPerson: {
    name: string
    surname: string
    dateOfBirth: Date
    dateOfDeath: Date
    addressStreet: string
    addressStreetNumber: string
    addressMunicipality: string
    addressPostCode: string
  }
}

export interface UploadFileToProceedingInput {
  stream: NodeJS.ReadableStream
  filename: string
  mimetype: string
  proceedingId: number
}

// helper function to generate a unique name for a new procedure
export function generateProceedingName(
  name: string,
  surname: string,
  startDate: Date
): string {
  const formattedDate = startDate.toISOString().split('T')[0].replace(/-/g, '_')
  const initialName = name[0].toUpperCase()
  const initialsSurname = surname.slice(0, 2).toUpperCase()

  return `${formattedDate}_${initialName}${initialsSurname}`
}

// Function to create a new procedure
export async function createProceeding(
  data: CreateProceedingData,
  context: CustomContext
): Promise<number> {
  // 0) check start date
  const startDate = data.startDate || new Date()
  // 1) generate a proceeding name
  const proceedingName = generateProceedingName(
    data.deceasedPerson.name,
    data.deceasedPerson.surname,
    startDate
  )
  // 3) try to find a notary (raise error if not found)
  const notaryId = await findAvailableNotary(
    {
      addressPostCode: data.deceasedPerson.addressPostCode,
      dateOfDeath: data.deceasedPerson.dateOfDeath,
    },
    context
  )
  if (!notaryId) {
    throw new Error('Nepodařilo se najít notáře pro zadanou adresu a datum')
  }
  // 4) create deceased address
  const deceasedAddressId = await context.addressRepository.createAddress({
    street: data.deceasedPerson.addressStreet,
    streetNumber: data.deceasedPerson.addressStreetNumber,
    municipality: data.deceasedPerson.addressMunicipality,
    postalCode: data.deceasedPerson.addressPostCode,
  })
  // 4) create proceeding
  const proceedingData = {
    name: proceedingName,
    notaryId: notaryId,
    startDate,
    deceasedAddressId: deceasedAddressId,
    deceasedName: data.deceasedPerson.name,
    deceasedSurname: data.deceasedPerson.surname,
    deceasedDisplayName: `${data.deceasedPerson.name} ${data.deceasedPerson.surname}`,
    deceasedDateOfBirth: data.deceasedPerson.dateOfBirth,
    deceasedDateOfDeath: data.deceasedPerson.dateOfDeath,
  }
  const proceedingId =
    await context.proceedingRepository.createProceeding(proceedingData)
  // 5) create new beneficiaries for new proceeding
  // Step 1: Create a set of unique userIds (filter out undefined values)
  const userIdsSet = new Set<number>(
    [
      ...data.beneficiaryUserIds, // Array of beneficiary user IDs
      //data.mainBeneficiaryUserId, // Single main beneficiary user ID
      context.authUser?.userId, // Current user ID (might be undefined)
    ].filter((id): id is number => id !== undefined) // Filter out undefined values
  )
  // Step 2: Create beneficiary create data from the unique user IDs
  await createBeneficiariesForProceeding(
    proceedingId,
    Array.from(userIdsSet),
    context
  )
  // 5) create chat for proceeding
  await context.chatRepository.createChat({
    proceedingId: proceedingId,
  })
  // set main beneficiary TODO slightly change DB schema -> this is very clunky
  if (data.mainBeneficiaryUserId) {
    const { id: mainBeneficiaryId } =
      await context.beneficiaryRepository.createBeneficiary({
        userId: data.mainBeneficiaryUserId,
        proceedingId: proceedingId,
      })
    await context.proceedingRepository.updateProceeding(proceedingId, {
      mainBeneficiaryId: mainBeneficiaryId,
    })
  }
  // 6) return proceeding id
  return proceedingId
}

// Function to close an existing procedure
export async function closeProceeding(
  procedureId: number,
  context: CustomContext
): Promise<void> {
  const { proceedingRepository } = context

  // Retrieve the procedure by ID to check its current state
  const proceeding = await proceedingRepository.getProceedingById(procedureId)

  // Check if the procedure is in an "open" state
  if (!proceeding || proceeding.state !== 'InProgress') {
    throw new Error('Only an open procedure can be closed')
  }

  // Proceed to close the procedure if it is "InProgress"
  const now = new Date()
  await proceedingRepository.updateProceeding(procedureId, {
    state: 'Closed',
    endDate: now,
  })
}

async function createBeneficiariesForProceeding(
  proceedingId: number,
  userIds: number[],
  context: CustomContext
): Promise<BeneficiaryEntity[]> {
  const { beneficiaryRepository } = context
  const beneficiaryCreateData = userIds.map((userId) => ({
    userId,
    proceedingId, // Link to the newly created proceeding
  }))
  // Step 3: Create beneficiaries in the database
  return await beneficiaryRepository.createBeneficiaries(beneficiaryCreateData)
}

export async function addBeneficiariesToProceeding(
  proceedingId: number,
  userIds: number[],
  context: CustomContext
): Promise<BeneficiaryEntity[]> {
  // Step 1: Get current beneficiaries for the proceeding
  const currentBeneficiaries =
    await context.beneficiaryRepository.getBeneficiariesByProceedingId(
      proceedingId
    )

  // Step 2: Extract the current beneficiary user IDs
  const currentBeneficiaryIds = currentBeneficiaries.map(
    (beneficiary) => beneficiary.userId
  )

  // Step 3: Filter out userIds that are already in currentBeneficiaryIds
  const newUserIds = userIds.filter(
    (userId) => !currentBeneficiaryIds.includes(userId)
  )

  // Step 4: Add only the new beneficiaries
  return await createBeneficiariesForProceeding(
    proceedingId,
    newUserIds,
    context
  )
}

export async function deleteBeneficiaryFromProceeding(
  proceedingId: number,
  beneficiaryId: number,
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context
  const proceeding =
    await context.proceedingRepository.getProceedingById(proceedingId)
  if (!proceeding) {
    throw new Error('Dědické řízení nebylo nalezeno')
  }
  // Step 2: Fetch current beneficiaries for the proceeding
  const currentBeneficiaries =
    await beneficiaryRepository.getBeneficiariesByProceedingId(proceedingId)
  const currentBeneficiaryIds = currentBeneficiaries.map(
    (beneficiary) => beneficiary.id
  )

  // Step 3: Validate that all `beneficiaryIds` exist in `currentBeneficiaries`
  if (!currentBeneficiaryIds.includes(beneficiaryId)) {
    throw new Error('Zvolený dědic neexistuje v tomto řízení')
  }
  return beneficiaryRepository.deleteBeneficiariesByIds([beneficiaryId])
}

export async function deleteProceedingsByIds(
  ids: number[],
  context: CustomContext
): Promise<void> {
  // Step 1: Fetch the procedures to get the associated contact IDs
  const proceedings =
    await context.proceedingRepository.getProceedingsByIds(ids)
  if (proceedings.length === 0) {
    throw new Error('Žádné řízení nebylo nalezeno')
  }
  // Step 2: Extract address ids
  const addressIdsToDelete = proceedings.reduce<number[]>((acc, proceeding) => {
    if (proceeding.deceasedAddressId) acc.push(proceeding.deceasedAddressId)
    return acc
  }, [])
  // Step 4: Delete the associated addresses in bulk
  if (addressIdsToDelete.length > 0) {
    await context.addressRepository.deleteAddressesByIds(addressIdsToDelete)
  }

  // delete attachments using the attachment service
  const proceedingsAttachments =
    await context.attachmentRepository.getAttachmentsByProceedingIds(ids)
  if (proceedingsAttachments.length > 0) {
    const attachmentIds = proceedingsAttachments.map(
      (attachment) => attachment.id
    )
    await deleteAttachmentsByIds(attachmentIds, context)
  }
  // Step 3: Delete the procedures
  await context.proceedingRepository.deleteProceedingsByIds(ids)
}

// Private helper function to determine the sender's name and email
function getEmailSender(
  notaryUser: { displayName?: string; email?: string } | null
): { senderName: string; senderEmail: string } {
  if (notaryUser?.email) {
    return {
      senderName: notaryUser.displayName || 'Notary',
      senderEmail: notaryUser.email,
    }
  }
  return {
    senderName: 'Portál dědice',
    senderEmail: process.env.EMAIL_USERNAME || 'noreply@portal-dedice.cz',
  }
}

// Remove a beneficiary from a procedure
export async function notifyProceedingBeneficiaries(
  proceedingId: number,
  subject: string,
  messageBody: string,
  context: CustomContext
): Promise<void> {
  // Fetch procedure
  const proceeding =
    await context.proceedingRepository.getProceedingById(proceedingId)
  if (!proceeding) {
    throw new Error('Procedure not found')
  }

  if (!proceeding.notaryId) {
    throw new Error('Procedure not assigned to a notary')
  }

  const notaryUser = await context.userRepository.getUserByNotaryId(
    proceeding.notaryId
  )
  if (!notaryUser) {
    throw new Error('Nepodařilo se nalézt uživatele notáře řízení')
  }
  // Fetch all beneficiaries and their contacts in one go
  const beneficiaries =
    await context.beneficiaryRepository.getBeneficiariesByProceedingId(
      proceedingId
    )
  const beneficiaryUserIds = beneficiaries.map(
    (beneficiary) => beneficiary.userId
  )
  const beneficiaryUsers =
    await context.userRepository.getUsersByIds(beneficiaryUserIds)
  // Determine the sender's name and email
  const emailSender = getEmailSender(notaryUser)
  // Loop through beneficiaries and send notifications in parallel
  await Promise.all(
    beneficiaryUsers
      .filter((user) => user.sendNotifications && user.email) // Filter valid users
      .map(async (user) => {
        try {
          // Render the template
          const html = await renderTemplate('notification', {
            recipientName: user.displayName,
            messageBody,
            procedureName: proceeding.name,
            senderName: emailSender.senderName,
            senderEmail: emailSender.senderEmail,
          })

          // Send the email
          await sendEmail({
            to: user.email,
            subject,
            html,
          })
        } catch (error) {
          // Ignore errors and continue with other beneficiaries
        }
      })
  )
}

export async function assignNotaryToProcedure(
  proceedingId: number,
  context: CustomContext
): Promise<void> {
  const { proceedingRepository } = context
  // Fetch the proceeding
  const proceeding = await proceedingRepository.getProceedingById(proceedingId)
  if (!proceeding) {
    throw new Error('Dědické řízení nebylo nalezeno')
  }
  if (proceeding.notaryId) {
    throw new Error('Notář již byl přiřazen k tomuto řízení')
  }
  if (proceeding.state === 'Closed') {
    throw new Error('Notář nemůže být přiřazen k uzavřenému řízení')
  }
  const addressErrorMsg = 'Adresa zemřelého nebyla nalezena'
  if (!proceeding.deceasedAddressId) {
    throw new Error(addressErrorMsg)
  }
  const deceasedAddress = await context.addressRepository.getAddressById(
    proceeding.deceasedAddressId
  )
  if (!deceasedAddress) {
    throw new Error(addressErrorMsg)
  }
  // Find an available notary for the procedure
  const notaryId = await findAvailableNotary(
    {
      addressPostCode: deceasedAddress.postalCode,
      dateOfDeath: proceeding.deceasedDateOfDeath,
    },
    context
  )
  if (!notaryId) {
    throw new Error('Nepodařilo se najít notáře pro zadanou adresu a datum')
  }
  // Update the proceeding with the new notary
  await proceedingRepository.updateProceeding(proceedingId, {
    notaryId,
  })
}

/**
 * Get all users associated with a proceeding.
 * Includes the notary and beneficiaries.
 */
export const getUsersForProceeding = async (
  proceedingId: number,
  context: CustomContext
) => {
  const { beneficiaryRepository, proceedingRepository, userRepository } =
    context
  const proceeding = await proceedingRepository.getProceedingById(proceedingId)

  const beneficiaries =
    await beneficiaryRepository.getBeneficiariesByProceedingId(proceedingId)

  const notaryUser = await userRepository.getUserByNotaryId(
    proceeding?.notaryId ?? -1
  )

  const notaryUserId = notaryUser?.id

  const beneficiariesUserIds = beneficiaries
    .map((beneficiary) => beneficiary.userId)
    .filter(
      (userId): userId is number => userId !== null && userId !== undefined
    )

  const userIds = [
    ...(typeof notaryUserId === 'number' ? [notaryUserId] : []),
    ...beneficiariesUserIds,
  ]

  const users = await context.userRepository.getUsersByIds(userIds)

  return users
}

export const uploadFileToProceeding = async (
  input: UploadFileToProceedingInput,
  context: CustomContext
): Promise<number> => {
  // check current attachment count
  const attachmentCount =
    await context.attachmentRepository.getAttachmentCountByProceedingId(
      input.proceedingId
    )
  if (attachmentCount >= PROCEEDING_ATTACHMENT_LIMIT) {
    throw new Error('Maximální počet příloh pro řízení byl dosažen')
  }
  // create attachment
  const attachmentId = await createAttachment(input, context)
  return attachmentId
}

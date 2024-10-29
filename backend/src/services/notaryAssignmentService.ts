// notaryAssignmentService.ts

import { CustomContext } from '@backend/types/types'

export interface FindAvailableNotaryInput {
  postalCode: string
  dateOfDeath: Date
}

export async function findAvailableNotary(
  input: FindAvailableNotaryInput,
  context: CustomContext
) {
  const { dateOfDeath, postalCode } = input
  const birthMonth = dateOfDeath.getMonth() + 1
  const birthDay = dateOfDeath.getDate()

  const notary = await context.notaryRepository.findAvailableNotary(
    birthMonth,
    birthDay,
    postalCode
  )

  if (!notary) {
    throw new Error(`Žádný notář nebyl nazelen pro PSČ: ${postalCode}`)
  }

  return notary
}

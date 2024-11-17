import { CustomContext } from '@backend/types/types'

export interface FindAvailableNotaryInput {
  addressPostCode: string
  dateOfDeath: Date
}

export async function findAvailableNotary(
  input: FindAvailableNotaryInput,
  context: CustomContext
) {
  const { dateOfDeath, addressPostCode } = input
  const birthMonth = dateOfDeath.getMonth() + 1
  const birthDay = dateOfDeath.getDate()

  const notary = await context.notaryRepository.findAvailableNotary(
    birthMonth,
    birthDay,
    addressPostCode
  )

  if (!notary) {
    throw new Error(`Žádný notář nebyl nazelen pro PSČ: ${addressPostCode}`)
  }

  return notary
}

import { CustomContext } from '@backend/types/types'

export interface FindAvailableNotaryInput {
  addressPostCode: string
  dateOfDeath: Date
}

export async function findAvailableNotary(
  input: FindAvailableNotaryInput,
  context: CustomContext
): Promise<number | null> {
  const { dateOfDeath, addressPostCode } = input
  const birthMonth = dateOfDeath.getMonth() + 1
  const birthDay = dateOfDeath.getDate()

  const notaryId = await context.notaryRepository.findAvailableNotary(
    birthMonth,
    birthDay,
    addressPostCode
  )
  return notaryId
}

import { MySql2Database } from 'drizzle-orm/mysql2'

import { getChatMessageRepository } from '../src/graphql/modules/chat/chatMessageRepository'
import { getChatRepository } from '../src/graphql/modules/chat/chatRepository'
import { getContactRepository } from '../src/graphql/modules/contact/contactRepository'
import { getInheritanceProcedureRepository } from '../src/graphql/modules/inheritanceProcedure/inheritaceProcedureRepository'
import {
  createProcedure,
  InheritanceProcedureData,
} from '../src/services/inheritanceProcedureService'
import { CustomContext } from '../src/types/types'

export async function seedInheritanceProcedures(
  db: MySql2Database<typeof import('../src/db/schema')>,
  inheritanceProcedureData: InheritanceProcedureData[]
) {
  console.log('Starting to seed inheritance procedures...')

  const inheritanceProcedureRepository = getInheritanceProcedureRepository(db)
  const contactRepository = getContactRepository(db)
  const chatRepository = getChatRepository(db)
  const chatMessageRepository = getChatMessageRepository(db)

  const proceduresIds: number[] = []
  for (const data of inheritanceProcedureData) {
    const procedureId = await createProcedure(data, {
      inheritanceProcedureRepository,
      contactRepository,
      chatRepository,
      chatMessageRepository,
    } as CustomContext)
    proceduresIds.push(procedureId)
  }

  console.log('Inheritance procedures seeded successfully.')

  return proceduresIds
}

import { MySql2Database } from 'drizzle-orm/mysql2'

import { type getBeneficiaryRepository } from '@backend/graphql/modules/beneficiary/beneficiaryRepository'
import { type getContactRepository } from '@backend/graphql/modules/contact/contactRepository'
import { type getDeceasedPersonRepository } from '@backend/graphql/modules/deceasedPerson/deceasedPersonRepository'
import { type getInheritanceProcedureRepository } from '@backend/graphql/modules/inheritanceProcedure/inheritaceProcedureRepository'
import { type getNotaryRepository } from '@backend/graphql/modules/notary/notaryRepository'
import { type getNotaryDateRuleRepository } from '@backend/graphql/modules/notaryDateRule/notaryDateRuleRepository'
import { type getUserRepository } from '@backend/graphql/modules/user/userRepository'

import * as schema from '../db/schema'

export type Db = MySql2Database<typeof schema>

export type CustomContext = {
  db: Db
  authUser: JWTPayload | null
  // repositories
  notaryRepository: ReturnType<typeof getNotaryRepository>
  userRepository: ReturnType<typeof getUserRepository>
  contactRepository: ReturnType<typeof getContactRepository>
  inheritanceProcedureRepository: ReturnType<
    typeof getInheritanceProcedureRepository
  >
  beneficiaryRepository: ReturnType<typeof getBeneficiaryRepository>
  notaryDateRuleRepository: ReturnType<typeof getNotaryDateRuleRepository>
  deceasedPersonRepository: ReturnType<typeof getDeceasedPersonRepository>
}

export type JWTPayload = {
  id: number
  iat: number
}

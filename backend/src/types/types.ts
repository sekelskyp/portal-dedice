import { createPubSub } from '@graphql-yoga/subscription'
import { MySql2Database } from 'drizzle-orm/mysql2'

import { getAssetRepository } from '@backend/graphql/modules/asset/assetRepository'
import { type getBeneficiaryRepository } from '@backend/graphql/modules/beneficiary/beneficiaryRepository'
import { getChatMessageRepository } from '@backend/graphql/modules/chat/chatMessageRepository'
import { getChatRepository } from '@backend/graphql/modules/chat/chatRepository'
import { type getContactRepository } from '@backend/graphql/modules/contact/contactRepository'
import { type getDocumentRepository } from '@backend/graphql/modules/document/documentRepository'
import { type getEmailConfirmationTokenRepository } from '@backend/graphql/modules/emailConfirmationToken/emailConfirmationTokenRepository'
import { type getInheritanceProcedureRepository } from '@backend/graphql/modules/inheritanceProcedure/inheritaceProcedureRepository'
import { type getNotaryRepository } from '@backend/graphql/modules/notary/notaryRepository'
import { type getNotaryDateRuleRepository } from '@backend/graphql/modules/notaryDateRule/notaryDateRuleRepository'
import { type getPasswordResetTokenRepository } from '@backend/graphql/modules/passwordResetToken/passwordResetTokenRepository'
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
  passwordResetTokenRepository: ReturnType<
    typeof getPasswordResetTokenRepository
  >
  emailConfirmationTokenRepository: ReturnType<
    typeof getEmailConfirmationTokenRepository
  >
  assetRepository: ReturnType<typeof getAssetRepository>
  documentRepository: ReturnType<typeof getDocumentRepository>
  chatRepository: ReturnType<typeof getChatRepository>
  chatMessageRepository: ReturnType<typeof getChatMessageRepository>
  pubSub: ReturnType<typeof createPubSub>
}

export type JWTPayload = {
  userId: number
  iat: number
}

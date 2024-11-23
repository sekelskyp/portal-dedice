import { createPubSub } from '@graphql-yoga/subscription'
import { MySql2Database } from 'drizzle-orm/mysql2'

import { type getAddressRepository } from '@backend/graphql/modules/address/addressRepository'
import { type getAssetRepository } from '@backend/graphql/modules/asset/assetRepository'
import { type getBeneficiaryRepository } from '@backend/graphql/modules/beneficiary/beneficiaryRepository'
import { type getChatMessageRepository } from '@backend/graphql/modules/chat/chatMessageRepository'
import { type getChatRepository } from '@backend/graphql/modules/chat/chatRepository'
import { type getDocumentRepository } from '@backend/graphql/modules/document/documentRepository'
import { type getEmailConfirmationTokenRepository } from '@backend/graphql/modules/emailConfirmationToken/emailConfirmationTokenRepository'
import { type getNotaryRepository } from '@backend/graphql/modules/notary/notaryRepository'
import { type getNotaryDateRuleRepository } from '@backend/graphql/modules/notaryDateRule/notaryDateRuleRepository'
import { type getPasswordResetTokenRepository } from '@backend/graphql/modules/passwordResetToken/passwordResetTokenRepository'
import { type getProceedingRepository } from '@backend/graphql/modules/proceeding/proceedingRepository'
import { type getUserRepository } from '@backend/graphql/modules/user/userRepository'

import * as schema from '../db/schema'

export type Db = MySql2Database<typeof schema>

export type CustomContext = {
  db: Db
  authUser: JWTPayload | null
  // repositories
  notaryRepository: ReturnType<typeof getNotaryRepository>
  userRepository: ReturnType<typeof getUserRepository>
  proceedingRepository: ReturnType<typeof getProceedingRepository>
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
  addressRepository: ReturnType<typeof getAddressRepository>
  chatRepository: ReturnType<typeof getChatRepository>
  chatMessageRepository: ReturnType<typeof getChatMessageRepository>
  pubSub: ReturnType<typeof createPubSub>
}

export type JWTPayload = {
  userId: number
  iat: number
}

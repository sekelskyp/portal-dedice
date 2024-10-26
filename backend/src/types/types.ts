import { MySql2Database } from 'drizzle-orm/mysql2'

import { type getContactRepository } from '@backend/graphql/modules/contact/contactRepository'
import { type getNotaryRepository } from '@backend/graphql/modules/notary/notaryRepository'
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
}

export type JWTPayload = {
  id: number
  iat: number
}

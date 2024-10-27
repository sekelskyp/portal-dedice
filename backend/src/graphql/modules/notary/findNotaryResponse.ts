import { Field, ID, ObjectType } from 'type-graphql'

import { Contact } from '../contact/contactType'

import { Notary } from './notaryType'

@ObjectType()
export class FindNotaryResponse {
  @Field(() => ID)
  notary!: Notary

  @Field(() => ID, { nullable: true })
  contact?: Contact | null
}

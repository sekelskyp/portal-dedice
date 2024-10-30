import { Field, ID, ObjectType } from 'type-graphql'

import { Contact } from '../contact/contactType'
import { User } from '../user/userType'

@ObjectType()
export class Notary {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true })
  userId?: number | null

  @Field(() => ID, { nullable: true })
  contactId?: number | null

  @Field(() => Contact, { nullable: true })
  contact?: Contact

  @Field(() => User, { nullable: true })
  user?: User
}

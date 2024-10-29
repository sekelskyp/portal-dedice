import { Field, ID, ObjectType } from 'type-graphql'

import { DeceasedRelationEnumType } from '../../../db/schema'
import { Contact } from '../contact/contactType'
import { User } from '../user/userType'

@ObjectType()
export class Beneficiary {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true })
  userId?: number | null

  @Field(() => String, { nullable: true })
  deceasedRelation!: DeceasedRelationEnumType | null

  @Field(() => ID, { nullable: true })
  contactId?: number | null

  @Field(() => Date, { nullable: true })
  dateOfBirth!: Date | null

  @Field(() => Contact, { nullable: true })
  contact?: Contact

  @Field(() => User, { nullable: true })
  user?: User
}

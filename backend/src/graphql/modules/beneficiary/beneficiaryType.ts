import { Field, ID, ObjectType } from 'type-graphql'

import { DeceasedRelationEnumType } from '../../../db/schema'
import { Contact } from '../contact/contactType'
import { User } from '../user/userType'

@ObjectType() // This decorator marks this class as a GraphQL type
export class Beneficiary {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true })
  userId?: number | null

  @Field()
  deceasedRelation!: DeceasedRelationEnumType

  @Field(() => ID, { nullable: true })
  contactId?: number | null

  @Field()
  dateOfBirth!: Date

  @Field(() => Contact, { nullable: true })
  contact?: Contact

  @Field(() => User, { nullable: true })
  user?: User
}

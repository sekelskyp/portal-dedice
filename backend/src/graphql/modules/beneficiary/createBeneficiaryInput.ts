import { Field, ID, InputType } from 'type-graphql'

import { DeceasedRelationEnumType } from '../../../db/schema'

@InputType()
export class CreateBeneficiaryInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field()
  deceasedRelation!: DeceasedRelationEnumType

  @Field(() => ID, { nullable: true })
  contactId?: number

  @Field()
  dateOfBirth!: Date
}

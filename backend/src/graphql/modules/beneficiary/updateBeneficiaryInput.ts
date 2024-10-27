import { Field, ID, InputType } from 'type-graphql'

import { DeceasedRelationEnumType } from '../../../db/schema'

@InputType()
export class UpdateBeneficiaryInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field({ nullable: true })
  deceasedRelation?: DeceasedRelationEnumType

  @Field(() => ID, { nullable: true })
  contactId?: number

  @Field({ nullable: true })
  dateOfBirth?: Date
}

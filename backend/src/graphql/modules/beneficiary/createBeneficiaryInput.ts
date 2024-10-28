import { Field, ID, InputType } from 'type-graphql'

import { DeceasedRelationEnumType } from '../../../db/schema'

@InputType()
export class CreateBeneficiaryInput {
  @Field(() => ID, { nullable: true })
  userId?: number | null

  @Field(() => String, { nullable: true })
  deceasedRelation?: DeceasedRelationEnumType | null

  @Field(() => ID, { nullable: true })
  contactId?: number | null

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date | null
}

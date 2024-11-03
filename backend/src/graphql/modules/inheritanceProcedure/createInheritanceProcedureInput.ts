import { Field, ID, InputType } from 'type-graphql'

import { InheritanceProcedureStateEnumType } from '@backend/db/schema'

@InputType()
export class CreateInheritanceProcedureInput {
  @Field(() => ID, { nullable: true })
  notaryId?: number | null

  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  state?: InheritanceProcedureStateEnumType

  @Field()
  startDate!: Date

  @Field()
  endDate?: Date

  @Field(() => ID, { nullable: true })
  mainContactId?: number | null

  @Field(() => ID)
  deceasedContactId!: number

  @Field(() => Date, { nullable: true })
  deceasedDateOfBirth?: Date | null

  @Field(() => Date, { nullable: true })
  deceasedDateOfDeath?: Date | null
}

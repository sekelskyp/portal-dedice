import { Field, ID, ObjectType } from 'type-graphql'

import { InheritanceProcedureStateEnumType } from '@backend/db/schema'

import { DeceasedPerson } from '../deceasedPerson/deceasedPersonType'

@ObjectType()
export class InheritanceProcedure {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true }) // Allow nullable
  notaryId!: number | null

  @Field(() => ID, { nullable: true }) // Allow nullable
  deceasedPersonId!: number | null

  @Field(() => DeceasedPerson, { nullable: true })
  deceasedPerson?: DeceasedPerson

  @Field()
  name!: string

  @Field(() => String)
  state!: InheritanceProcedureStateEnumType

  @Field()
  startDate!: Date

  @Field({ nullable: true })
  endDate?: Date | null
}

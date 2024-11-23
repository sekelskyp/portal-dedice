import { Field, ID, ObjectType } from 'type-graphql'

import { proceedingStateEnum, ProceedingStateEnumType } from '@shared/enums'

@ObjectType()
export class Proceeding {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true })
  notaryId!: number | null

  @Field()
  name!: string

  @Field(() => proceedingStateEnum)
  state!: ProceedingStateEnumType

  @Field()
  startDate!: Date

  @Field(() => Date, { nullable: true })
  endDate!: Date | null

  @Field(() => ID, { nullable: true })
  mainBeneficiaryId!: number | null

  @Field()
  deceasedName!: string

  @Field()
  deceasedDisplayName!: string

  @Field(() => ID)
  deceasedAddressId!: number

  @Field(() => Date)
  deceasedDateOfBirth!: Date

  @Field(() => Date)
  deceasedDateOfDeath!: Date
}

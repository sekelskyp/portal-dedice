import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class BeneficiaryInput {
  @Field(() => ID)
  userId!: number

  @Field(() => ID, { nullable: true })
  proceedingId?: number | null
}

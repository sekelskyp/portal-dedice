import { Field, ID, InputType } from 'type-graphql'

@InputType()
class DeceasedPersonInput {
  @Field()
  name!: string

  @Field()
  surname!: string

  @Field()
  dateOfBirth!: Date

  @Field()
  dateOfDeath!: Date

  @Field()
  addressStreet!: string

  @Field()
  addressStreetNumber!: string

  @Field()
  addressMunicipality!: string

  @Field()
  addressPostCode!: string
}

@InputType()
export class CreateProceedingInput {
  @Field({ nullable: true })
  startDate?: Date

  @Field()
  deceasedPerson!: DeceasedPersonInput

  @Field(() => ID, { nullable: true })
  mainBeneficiaryUserId?: number

  @Field(() => [ID])
  beneficiaryUserIds!: number[]
}

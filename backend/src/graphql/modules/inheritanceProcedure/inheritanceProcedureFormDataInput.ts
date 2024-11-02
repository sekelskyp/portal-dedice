import { Field, InputType } from 'type-graphql'

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
  completeAddress!: string
}

@InputType()
class ContactPersonInput {
  @Field()
  name!: string

  @Field()
  surname!: string

  @Field()
  email!: string
}

@InputType()
class BeneficiaryInput {
  @Field()
  name!: string

  @Field()
  surname!: string

  @Field()
  email!: string
}

@InputType()
export class InheritanceProcedureFormDataInput {
  @Field()
  deceasedPerson!: DeceasedPersonInput

  @Field()
  contactPerson!: ContactPersonInput

  @Field(() => [BeneficiaryInput])
  beneficiaries!: BeneficiaryInput[]
}

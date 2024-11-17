import { Field, ID, ObjectType } from 'type-graphql'

import { InheritanceProcedureStateEnumType } from '@backend/db/schema'

import { AssetCopy } from '../asset/assetCopy'
import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Contact } from '../contact/contactType'
import { Notary } from '../notary/notaryType'

@ObjectType()
export class InheritanceProcedure {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true })
  notaryId!: number | null

  @Field(() => Notary, { nullable: true })
  notary?: Notary

  @Field()
  name!: string

  @Field(() => String)
  state!: InheritanceProcedureStateEnumType

  @Field()
  startDate!: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date | null

  @Field(() => [Beneficiary], { nullable: true })
  beneficiaries?: Beneficiary[]

  @Field(() => ID, { nullable: true })
  mainContactId?: number | null

  @Field(() => Contact, { nullable: true })
  mainContact?: Contact | null

  @Field(() => ID, { nullable: true })
  deceasedContactId?: number | null

  @Field(() => Contact, { nullable: true })
  deceasedContact?: Contact | null

  @Field(() => Date, { nullable: true })
  deceasedDateOfBirth?: Date | null

  @Field(() => Date, { nullable: true })
  deceasedDateOfDeath?: Date | null

  @Field(() => [AssetCopy], { nullable: true })
  procedureAssets?: AssetCopy[]
}

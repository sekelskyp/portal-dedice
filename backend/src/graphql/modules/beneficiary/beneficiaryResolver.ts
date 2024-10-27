import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { DeceasedRelationEnumType } from '@backend/db/schema'
import { CustomContext } from '@backend/types/types'

import { Contact } from '../contact/contactType'
import { User } from '../user/userType'

import { BeneficiaryData } from './beneficiaryRepository'
import { Beneficiary } from './beneficiaryType'
import { CreateBeneficiaryInput } from './createBeneficiaryInput'
import { UpdateBeneficiaryInput } from './updateBeneficiaryInput'

@Resolver(() => Beneficiary)
export class BeneficiaryResolver {
  // Field resolver for contact
  @FieldResolver(() => Contact, { nullable: true })
  async contact(
    @Root() beneficiary: Beneficiary,
    @Ctx() { contactRepository }: CustomContext
  ): Promise<Contact | null> {
    // If there's no contactId, return null
    if (!beneficiary.contactId) {
      return null
    }
    // Fetch the contact using contactId from the repository
    return await contactRepository.getContactById(beneficiary.contactId)
  }

  // Field resolver to get the user associated with a beneficiary
  @FieldResolver(() => User, { nullable: true })
  async user(
    @Root() beneficiary: Beneficiary,
    @Ctx() { userRepository }: CustomContext
  ): Promise<User | null> {
    // Check if userId exists on the beneficiary and retrieve the user
    if (!beneficiary.userId) return null
    return await userRepository.getUserById(beneficiary.userId)
  }

  // Get a beneficiary by ID
  @Query(() => Beneficiary, { nullable: true })
  async getBeneficiaryById(
    @Arg('id', () => Int) id: number,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    return await beneficiaryRepository.getBeneficiaryById(id)
  }

  // Get all beneficiaries associated with a specific procedure
  @Query(() => [Beneficiary])
  async getBeneficiariesByProcedureId(
    @Arg('procedureId', () => Int) procedureId: number,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    return await beneficiaryRepository.getBeneficiariesByProcedureId(
      procedureId
    )
  }

  // Get multiple beneficiaries by IDs
  @Query(() => [Beneficiary])
  async getBeneficiariesByIds(
    @Arg('ids', () => [Int]) ids: number[],
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    return await beneficiaryRepository.getBeneficiariesByIds(ids)
  }

  // Create a new beneficiary
  @Mutation(() => Beneficiary)
  async createBeneficiary(
    @Arg('data') data: CreateBeneficiaryInput,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary> {
    // Map CreateBeneficiaryInput (GraphQL type) to BeneficiaryData (repository type)
    const beneficiaryData: BeneficiaryData = {
      userId: data.userId,
      deceasedRelation: data.deceasedRelation as DeceasedRelationEnumType,
      contactId: data.contactId,
      dateOfBirth: data.dateOfBirth,
    }
    const id = await beneficiaryRepository.createBeneficiary(beneficiaryData)
    const result = await beneficiaryRepository.getBeneficiaryById(id)
    return result
  }

  // Create multiple beneficiaries
  @Mutation(() => [Beneficiary])
  async createBeneficiaries(
    @Arg('data', () => [CreateBeneficiaryInput]) data: CreateBeneficiaryInput[],
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    const ids = await beneficiaryRepository.createBeneficiaries(data)
    return ids.map((id, index) => ({ id, ...data[index] }))
  }

  // Update an existing beneficiary by ID
  @Mutation(() => Beneficiary)
  async updateBeneficiary(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateBeneficiaryInput,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    await beneficiaryRepository.updateBeneficiary(id, data)
    return await beneficiaryRepository.getBeneficiaryById(id)
  }

  // Delete a beneficiary by ID
  @Mutation(() => Boolean)
  async deleteBeneficiary(
    @Arg('id', () => Int) id: number,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<boolean> {
    await beneficiaryRepository.deleteBeneficiary(id)
    return true
  }
}

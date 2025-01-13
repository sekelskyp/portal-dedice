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

import { CustomContext } from '@backend/types/types'

import { User } from '../user/userType'

import { BeneficiaryInput } from './beneficiaryInput'
import { Beneficiary } from './beneficiaryType'

@Resolver(() => Beneficiary)
export class BeneficiaryResolver {
  // ===============================
  // QUERIES
  // ===============================

  @Query(() => Beneficiary, { nullable: true })
  async getBeneficiaryById(
    @Arg('id', () => Int) id: number,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    return await beneficiaryRepository.getBeneficiaryById(id)
  }

  @Query(() => [Beneficiary])
  async getBeneficiariesByProceedingId(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    // Directly return the results from the repository
    return await beneficiaryRepository.getBeneficiariesByProceedingId(
      proceedingId
    )
  }

  @Query(() => [Beneficiary])
  async getBeneficiariesByIds(
    @Arg('ids', () => [Int]) ids: number[],
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    return await beneficiaryRepository.getBeneficiariesByIds(ids)
  }

  // ===============================
  // MUTATIONS
  // ===============================

  @Mutation(() => Beneficiary)
  async createBeneficiary(
    @Arg('data') data: BeneficiaryInput,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary> {
    const { id: beneficiaryId } =
      await beneficiaryRepository.createBeneficiary(data)
    if (!beneficiaryId) {
      throw new Error('Failed to create beneficiary')
    }
    const beneficiary =
      await beneficiaryRepository.getBeneficiaryById(beneficiaryId)
    if (!beneficiary) {
      throw new Error('Failed to fetch created beneficiary')
    }
    return beneficiary
  }

  @Mutation(() => [Beneficiary])
  async createBeneficiaries(
    @Arg('data', () => [BeneficiaryInput]) data: BeneficiaryInput[],
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    const res = await beneficiaryRepository.createBeneficiaries(data)
    const beneficiaries = beneficiaryRepository.getBeneficiariesByIds(
      res.map((r) => r.id)
    )
    return beneficiaries
  }

  @Mutation(() => Beneficiary)
  async updateBeneficiary(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: BeneficiaryInput,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    await beneficiaryRepository.updateBeneficiaryById(id, data)
    return await beneficiaryRepository.getBeneficiaryById(id)
  }

  @Mutation(() => Boolean)
  async deleteBeneficiaries(
    @Arg('id', () => Int) id: number,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<boolean> {
    await beneficiaryRepository.deleteBeneficiariesByIds([id])
    return true
  }

  // ----------------------------------
  // FIELD RESOLVERS
  // ----------------------------------

  @FieldResolver(() => User, { nullable: true })
  async user(
    @Root() beneficiary: Beneficiary,
    @Ctx() { userRepository }: CustomContext
  ): Promise<User | null> {
    return await userRepository.getUserById(beneficiary.userId)
  }
}

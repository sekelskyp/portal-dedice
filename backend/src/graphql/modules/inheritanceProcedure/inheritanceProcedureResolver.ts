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

import {
  addBeneficiaryToProcedure,
  assignNotary,
  closeProcedure,
  createProcedure,
  InheritanceProcedureData,
  removeBeneficiaryFromProcedure,
} from '../../../services/inheritanceProcedureService'
import { CustomContext } from '../../../types/types'
import { DeceasedPerson } from '../deceasedPerson/deceasedPersonType'

import { CreateInheritanceProcedureInput } from './createInheritanceProcedureInput'
import { InheritanceProcedure } from './inheritanceProcedureType'

@Resolver(() => InheritanceProcedure)
export class InheritanceProcedureResolver {
  // Query to get a procedure by ID
  @Query(() => InheritanceProcedure, { nullable: true })
  async getProcedureById(
    @Arg('id', () => Int) id: number,
    @Ctx() { inheritanceProcedureRepository }: CustomContext
  ): Promise<InheritanceProcedure | null> {
    return await inheritanceProcedureRepository.getProcedureById(id)
  }

  // Mutation to create a new procedure
  @Mutation(() => Int) // Returning the ID of the newly created procedure
  async createProcedure(
    @Arg('data') data: CreateInheritanceProcedureInput,
    @Ctx() context: CustomContext
  ): Promise<number> {
    const procedureData: InheritanceProcedureData = {
      ...data,
      state: data.state ?? 'InProgress', // Ensure `state` is always defined
    }
    return await createProcedure(procedureData, context)
  }

  // Mutation to close an existing procedure
  @Mutation(() => Boolean)
  async closeProcedure(
    @Arg('procedureId', () => Int) procedureId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await closeProcedure(procedureId, context)
    return true
  }

  // Mutation to add a beneficiary to a procedure
  @Mutation(() => Boolean)
  async addBeneficiaryToProcedure(
    @Arg('procedureId', () => Int) procedureId: number,
    @Arg('beneficiaryId', () => Int) beneficiaryId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await addBeneficiaryToProcedure(procedureId, beneficiaryId, context)
    return true
  }

  // Mutation to remove a beneficiary from a procedure
  @Mutation(() => Boolean)
  async removeBeneficiaryFromProcedure(
    @Arg('procedureId', () => Int) procedureId: number,
    @Arg('beneficiaryId', () => Int) beneficiaryId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await removeBeneficiaryFromProcedure(procedureId, beneficiaryId, context)
    return true
  }

  // Mutation to assign a notary to a procedure
  @Mutation(() => Boolean)
  async assignNotary(
    @Arg('procedureId', () => Int) procedureId: number,
    @Arg('notaryId', () => Int) notaryId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await assignNotary(procedureId, notaryId, context)
    return true
  }

  // Field Resolver to fetch the deceased person associated with the procedure
  @FieldResolver(() => DeceasedPerson, { nullable: true })
  async deceasedPerson(
    @Root() procedure: InheritanceProcedure,
    @Ctx() { deceasedPersonRepository }: CustomContext
  ): Promise<DeceasedPerson | null> {
    if (!procedure.deceasedPersonId) {
      return null
    }
    return await deceasedPersonRepository.getDeceasedPersonById(
      procedure.deceasedPersonId
    )
  }
}

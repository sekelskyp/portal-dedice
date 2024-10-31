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
  removeBeneficiaryFromProcedure,
} from '../../../services/inheritanceProcedureService'
import { CustomContext } from '../../../types/types'
import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Contact } from '../contact/contactType'
import { Notary } from '../notary/notaryType'

import { CreateInheritanceProcedureInput } from './createInheritanceProcedureInput'
import { InheritanceProcedureData } from './inheritaceProcedureRepository'
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

  // Field Resolver to fetch the main Beneficiary associated with the procedure
  @FieldResolver(() => Beneficiary, { nullable: true })
  async mainBeneficiary(
    @Root() procedure: InheritanceProcedure,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    if (!procedure.mainBeneficiaryId) {
      return null
    }
    return await beneficiaryRepository.getBeneficiaryById(
      procedure.mainBeneficiaryId
    )
  }

  // Field Resolver to fetch the deceased person contact associated with the procedure
  @FieldResolver(() => Contact, { nullable: true })
  async deceasedContact(
    @Root() procedure: InheritanceProcedure,
    @Ctx() { contactRepository }: CustomContext
  ): Promise<Contact | null> {
    if (!procedure.mainBeneficiaryId) {
      return null
    }
    return await contactRepository.getContactById(procedure.mainBeneficiaryId)
  }

  // Field Resolver to fetch the deceased person associated with the procedure
  @FieldResolver(() => Notary, { nullable: true })
  async notary(
    @Root() procedure: InheritanceProcedure,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary | null> {
    if (!procedure.notaryId) {
      return null
    }
    return await notaryRepository.getNotaryById(procedure.notaryId)
  }

  // Field Resolver to fetch the beneficiaries associated with the procedure
  @FieldResolver(() => Beneficiary, { nullable: true })
  async beneficiaries(
    @Root() procedure: InheritanceProcedure,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    return await beneficiaryRepository.getBeneficiariesByProcedureId(
      procedure.id
    )
  }

  @Query(() => [InheritanceProcedure])
  async getProceduresByNotaryId(
    @Arg('notaryId', () => Int) notaryId: number,
    @Ctx() { inheritanceProcedureRepository }: CustomContext
  ): Promise<InheritanceProcedure[]> {
    return await inheritanceProcedureRepository.getProceduresByNotaryId(
      notaryId
    )
  }

  @Query(() => [InheritanceProcedure])
  async getProceduresByBeneficiaryId(
    @Arg('beneficiaryId', () => Int) beneficiaryId: number,
    @Ctx() { inheritanceProcedureRepository }: CustomContext
  ): Promise<InheritanceProcedure[]> {
    const procedureRecords =
      await inheritanceProcedureRepository.getProceduresByBeneficiaryId(
        beneficiaryId
      )
    return procedureRecords.map((record) => ({
      ...record.inheritance_procedure,
    }))
  }
}

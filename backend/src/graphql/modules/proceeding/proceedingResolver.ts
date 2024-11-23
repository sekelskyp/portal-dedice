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

import { Asset } from '@backend/graphql/modules/asset/assetType'
import { Document } from '@backend/graphql/modules/document/documentType'
import { getDocumentsByProcedureId } from '@backend/services/documentService'

import {
  addBeneficiariesToProceeding,
  assignNotaryToProcedure,
  closeProceeding,
  createProceeding,
  deleteBeneficiaryFromProceeding,
  deleteProceduresByIds,
  notifyProceedingBeneficiaries,
} from '../../../services/proceedingService'
import { CustomContext } from '../../../types/types'
import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Notary } from '../notary/notaryType'

import { CreateProceedingInput } from './createProceedingInput'
import { Proceeding } from './proceedingType'

@Resolver(() => Proceeding)
export class InheritanceProcedureResolver {
  // ----------------------------------
  // QUERIES
  // ----------------------------------

  // Query to get a proceeding by ID
  @Query(() => Proceeding, { nullable: true })
  async getProceedingById(
    @Arg('id', () => Int) id: number,
    @Ctx() { proceedingRepository }: CustomContext
  ): Promise<Proceeding | null> {
    return await proceedingRepository.getProceedingById(id)
  }

  // Query to get all proceedings
  @Query(() => [Proceeding])
  async getAllProceedings(
    @Ctx() { proceedingRepository }: CustomContext
  ): Promise<Proceeding[]> {
    return await proceedingRepository.getAllProceedings()
  }

  // Query to get proceedings for a beneficiary user
  @Query(() => [Proceeding])
  async getBeneficiaryProceedingsForUser(
    @Arg('userId', () => Int) userId: number,
    @Ctx() { proceedingRepository }: CustomContext
  ): Promise<Proceeding[]> {
    return await proceedingRepository.getBeneficiaryProceedingsForUser(userId)
  }

  // Query to get proceedings for a notary user
  @Query(() => [Proceeding])
  async getNotaryProceedingsForUser(
    @Arg('userId', () => Int) userId: number,
    @Ctx() { proceedingRepository }: CustomContext
  ): Promise<Proceeding[]> {
    return await proceedingRepository.getNotaryProceedingsForUser(userId)
  }

  // Query to get documents by proceeding ID
  @Query(() => [Document])
  async getDocumentsByProceedingId(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() context: CustomContext
  ): Promise<Document[]> {
    return await getDocumentsByProcedureId(proceedingId, context)
  }

  // Query to get assets by proceeding ID
  @Query(() => [Asset])
  async getAssetsByProceedingId(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset[]> {
    return await assetRepository.getAssetsByProcedureId(proceedingId)
  }

  // ----------------------------------
  // MUTATIONS
  // ----------------------------------

  // Mutation to create a new proceeding
  @Mutation(() => Int) // Returning the ID of the newly created proceeding
  async createProceeding(
    @Arg('data') data: CreateProceedingInput,
    @Ctx() context: CustomContext
  ): Promise<number> {
    return await createProceeding(data, context)
  }

  // Mutation to close a proceeding
  @Mutation(() => Boolean)
  async closeProceeding(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await closeProceeding(proceedingId, context)
    return true
  }

  // Mutation to add beneficiaries to a proceeding
  @Mutation(() => Boolean)
  async addBeneficiariesToProceeding(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Arg('userIds', () => [Int]) userIds: number[],
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await addBeneficiariesToProceeding(proceedingId, userIds, context)
    return true
  }

  // Mutation to remove a beneficiary from a proceeding
  @Mutation(() => Boolean)
  async removeBeneficiaryFromProceeding(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Arg('beneficiaryId', () => Int) beneficiaryId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await deleteBeneficiaryFromProceeding(
      proceedingId,
      [beneficiaryId],
      context
    )
    return true
  }

  // Mutation to assign a notary to a proceeding
  @Mutation(() => Boolean)
  async assignNotary(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await assignNotaryToProcedure(proceedingId, context)
    return true
  }

  // Mutation to delete proceedings by IDs
  @Mutation(() => [Int])
  async deleteProceduresByIds(
    @Arg('ids', () => [Int]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<number[]> {
    return await deleteProceduresByIds(ids, context)
  }

  // Mutation to notify beneficiaries of a proceeding
  @Mutation(() => Boolean)
  async notifyProcedureBeneficiaries(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Arg('subject') subject: string,
    @Arg('html') html: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await notifyProceedingBeneficiaries(proceedingId, subject, html, context)
    return true
  }

  // ----------------------------------
  // FIELD RESOLVERS
  // ----------------------------------

  // Field Resolver to fetch the main beneficiary
  @FieldResolver(() => Beneficiary, { nullable: true })
  async mainBeneficiaryId(
    @Root() proceeding: Proceeding,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    if (!proceeding.mainBeneficiaryId) {
      return null
    }
    return await beneficiaryRepository.getBeneficiaryById(
      proceeding.mainBeneficiaryId
    )
  }

  // Field Resolver to fetch the notary
  @FieldResolver(() => Notary, { nullable: true })
  async notary(
    @Root() proceeding: Proceeding,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary | null> {
    if (!proceeding.notaryId) {
      return null
    }
    return await notaryRepository.getNotaryById(proceeding.notaryId)
  }

  // Field Resolver to fetch beneficiaries
  @FieldResolver(() => [Beneficiary], { nullable: true })
  async beneficiaries(
    @Root() proceeding: Proceeding,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary[]> {
    return await beneficiaryRepository.getBeneficiariesByProceedingId(
      proceeding.id
    )
  }

  // Field Resolver to fetch documents
  @FieldResolver(() => [Document])
  async documents(
    @Root() proceeding: Proceeding,
    @Ctx() context: CustomContext
  ): Promise<Document[]> {
    return await getDocumentsByProcedureId(proceeding.id, context)
  }

  // Field Resolver to fetch assets
  @FieldResolver(() => [Asset], { nullable: true })
  async procedureAssets(
    @Root() proceeding: Proceeding,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset[]> {
    return await assetRepository.getAssetsByProcedureId(proceeding.id)
  }
}

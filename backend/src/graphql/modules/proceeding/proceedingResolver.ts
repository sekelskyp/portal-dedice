import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { Asset } from '@backend/graphql/modules/asset/assetType'
import { CustomContext } from '@backend/types/types'

import { Address } from '../address/adressType'
import { Attachment } from '../attachment/attachmentType'
import { BeneficiaryEntity } from '../beneficiary/beneficiaryRepository'
import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Notary } from '../notary/notaryType'

import { CreateProceedingInput } from './createProceedingInput'
import {
  addBeneficiariesToProceeding,
  assignNotaryToProcedure,
  closeProceeding,
  createProceeding,
  deleteBeneficiaryFromProceeding,
  deleteProceedingsByIds,
  notifyProceedingBeneficiaries,
  uploadFileToProceeding,
} from './proceedingService'
import { Proceeding } from './proceedingType'
import { UploadFileToProceedingInput } from './uploadFileToProceedingInput'

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

  // Query to get assets by proceeding ID
  @Query(() => [Asset])
  async getAssetsByProceedingId(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset[]> {
    return await assetRepository.getAssetsByProcedureId(proceedingId)
  }

  // Query to get attachments by proceeding ID
  @Query(() => [Attachment])
  async getAttachmentsByProceedingId(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() { attachmentRepository }: CustomContext
  ): Promise<Attachment[]> {
    return await attachmentRepository.getAttachmentsByProceedingId(proceedingId)
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
  @Mutation(() => [Beneficiary])
  async addBeneficiariesToProceeding(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Arg('userIds', () => [Int]) userIds: number[],
    @Ctx() context: CustomContext
  ): Promise<BeneficiaryEntity[]> {
    const beneficiaryIds = await addBeneficiariesToProceeding(
      proceedingId,
      userIds,
      context
    )
    return beneficiaryIds
  }

  // Mutation to remove a beneficiary from a proceeding
  @Mutation(() => Boolean)
  async removeBeneficiaryFromProceeding(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Arg('beneficiaryId', () => Int) beneficiaryId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await deleteBeneficiaryFromProceeding(proceedingId, beneficiaryId, context)
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

  @Mutation(() => Boolean)
  async assignMainBeneficiary(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Arg('beneficiaryId', () => Int) beneficiaryId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await context.proceedingRepository.updateProceeding(proceedingId, {
      mainBeneficiaryId: beneficiaryId,
    })
    return true
  }

  @Mutation(() => Boolean)
  async removeMainBeneficiary(
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await context.proceedingRepository.updateProceeding(proceedingId, {
      mainBeneficiaryId: null,
    })
    return true
  }

  @Mutation(() => Boolean)
  async updateName(
    @Arg('name') name: string,
    @Arg('proceedingId', () => Int) proceedingId: number,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await context.proceedingRepository.updateProceeding(proceedingId, {
      name,
    })
    return true
  }

  // Mutation to delete proceedings by IDs
  @Mutation(() => Boolean)
  async deleteProceedingsByIds(
    @Arg('ids', () => [Int]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await deleteProceedingsByIds(ids, context)
    return true
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

  @Mutation(() => ID)
  async uploadAttachmentToProceeding(
    @Arg('data') data: UploadFileToProceedingInput,
    @Ctx() context: CustomContext
  ): Promise<number> {
    // Destructure and extract the file details
    const { createReadStream, filename, mimetype } = await data.file // WARNING - THIS HAS TO BE AWAITED - VSCODE IS WRONG
    const stream = createReadStream()

    const createAttachmentInput = {
      proceedingId: data.proceedingId,
      stream: stream,
      filename: filename,
      mimetype: mimetype,
    }
    return uploadFileToProceeding(createAttachmentInput, context)
  }

  // ----------------------------------
  // FIELD RESOLVERS
  // ----------------------------------

  // Field Resolver to fetch the main beneficiary
  @FieldResolver(() => Beneficiary, { nullable: true })
  async mainBeneficiary(
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

  // Field Resolver to fetch assets
  @FieldResolver(() => [Asset], { nullable: true })
  async procedureAssets(
    @Root() proceeding: Proceeding,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset[]> {
    return await assetRepository.getAssetsByProcedureId(proceeding.id)
  }

  // Field Resolver to fetch address
  @FieldResolver(() => Address, { nullable: true })
  async deceasedAddress(
    @Root() proceeding: Proceeding,
    @Ctx() { addressRepository }: CustomContext
  ): Promise<Address | null> {
    if (!proceeding.deceasedAddressId) {
      return null
    }
    return await addressRepository.getAddressById(proceeding.deceasedAddressId)
  }
}

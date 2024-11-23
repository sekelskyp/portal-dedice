import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { Asset } from '@backend/graphql/modules/asset/assetType'
import { CustomContext } from '@backend/types/types'

import { AssetInput } from './assetInput'

// Utility function to check car registration date validity
function checkCarRegistrationDate(registrationDate: Date | null | undefined) {
  if (registrationDate && registrationDate > new Date()) {
    throw new Error('Není možné zadat datum registrace vozu v budoucnosti.')
  }
}

@Resolver(() => Asset)
export class AssetResolver {
  // ----------------------------------
  // QUERIES
  // ----------------------------------

  // Query to get an asset by ID
  @Query(() => Asset, { nullable: true })
  async getAssetById(
    @Arg('id', () => Int) id: number,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset | null> {
    return await assetRepository.getAssetById(id)
  }

  // ----------------------------------
  // MUTATIONS
  // ----------------------------------

  // Mutation to create a new asset
  @Mutation(() => Asset)
  async createAsset(
    @Arg('data') data: AssetInput,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset> {
    checkCarRegistrationDate(data.carRegistrationDate)
    const assetId = await assetRepository.createAsset(data)
    const asset = await assetRepository.getAssetById(assetId)
    if (!asset) {
      throw new Error('Asset was created but could not be fetched')
    }
    return asset
  }

  // Mutation to update an existing asset
  @Mutation(() => Asset, { nullable: true })
  async updateAsset(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: AssetInput,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset | null> {
    checkCarRegistrationDate(data.carRegistrationDate)
    const asset = await assetRepository.getAssetById(id)
    if (!asset) {
      throw new Error('Asset not found')
    }

    await assetRepository.updateAsset(id, data)
    return await assetRepository.getAssetById(id)
  }

  // Mutation to delete an asset by ID
  @Mutation(() => Boolean)
  async deleteAsset(
    @Arg('id', () => Int) id: number,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<boolean> {
    const asset = await assetRepository.getAssetById(id)
    if (!asset) {
      throw new Error('Asset not found')
    }

    await assetRepository.deleteAsset(id)
    return true
  }
}

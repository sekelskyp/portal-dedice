import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { AssetCopy } from './assetCopy'
import { CreateAssetInput } from './createAssetInput'
import { UpdateAssetInput } from './updateAssetInput'

function checkCarRegistrationDate(registrationDate: Date | null | undefined) {
  if (registrationDate && registrationDate > new Date()) {
    throw new Error('Není možné zadat datum registrace vozu v budoucnosti.')
  }
}

@Resolver(() => AssetCopy)
export class AssetResolver {
  // Query to get an asset by ID
  @Query(() => AssetCopy, { nullable: true })
  async getAssetById(
    @Arg('id', () => Int) id: number,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<AssetCopy | null> {
    return await assetRepository.getAssetById(id)
  }

  // Mutation to create a new asset
  @Mutation(() => AssetCopy)
  async createAsset(
    @Arg('data') data: CreateAssetInput,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<AssetCopy> {
    checkCarRegistrationDate(data.carRegistrationDate)
    const assetId = await assetRepository.createAsset(data)
    return await assetRepository.getAssetById(assetId)
  }

  // Mutation to update an existing asset
  @Mutation(() => AssetCopy, { nullable: true })
  async updateAsset(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateAssetInput,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<AssetCopy | null> {
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

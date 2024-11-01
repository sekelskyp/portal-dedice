import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { Asset } from '../asset/assetType'
import { CreateAssetInput } from '../asset/createAssetInput'

import { UpdateAssetInput } from './updateAssetInput'

@Resolver(() => Asset)
export class AssetResolver {
  // Query to get an asset by ID
  @Query(() => Asset, { nullable: true })
  async asset(
    @Arg('id', () => Int) id: number,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset | null> {
    return await assetRepository.getAssetById(id)
  }

  // Mutation to create a new asset
  @Mutation(() => Asset)
  async createAsset(
    @Arg('data') data: CreateAssetInput,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset> {
    const assetId = await assetRepository.createAsset(data)
    return await assetRepository.getAssetById(assetId)
  }

  // Mutation to update an existing asset
  @Mutation(() => Asset, { nullable: true })
  async updateAsset(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateAssetInput,
    @Ctx() { assetRepository }: CustomContext
  ): Promise<Asset | null> {
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

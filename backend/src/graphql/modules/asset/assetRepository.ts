import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { asset } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface AssetEntity extends InferSelectModel<typeof asset> {}
export interface AssetInsertInput
  extends InferInsertModel<Omit<typeof asset, 'id'>> {}

export function getAssetRepository(db: Db) {
  // Get an asset by ID
  async function getAssetById(id: number): Promise<AssetEntity | null> {
    const [result] = await db.select().from(asset).where(eq(asset.id, id))
    return result || null
  }

  // Get assets by their IDs
  async function getAssetsByIds(ids: number[]): Promise<AssetEntity[]> {
    const results = await db.select().from(asset).where(inArray(asset.id, ids))

    return results
  }

  // Get all assets associated with a specific procedure
  async function getAssetsByProcedureId(
    procedureId: number
  ): Promise<AssetEntity[]> {
    return await db
      .select()
      .from(asset)
      .where(eq(asset.proceedingId, procedureId))
      .then((assets) => assets)
  }

  // Create a new asset
  async function createAsset(data: AssetInsertInput): Promise<number> {
    const [result] = await db.insert(asset).values(data).$returningId()
    return result.id
  }

  // delete an asset by ID
  async function deleteAsset(id: number): Promise<void> {
    await db.delete(asset).where(eq(asset.id, id))
  }

  // Update an existing asset
  async function updateAsset(
    id: number,
    data: Partial<AssetInsertInput>
  ): Promise<void> {
    await db.update(asset).set(data).where(eq(asset.id, id))
  }

  return {
    getAssetById,
    getAssetsByIds,
    getAssetsByProcedureId,
    createAsset,
    deleteAsset,
    updateAsset,
  }
}

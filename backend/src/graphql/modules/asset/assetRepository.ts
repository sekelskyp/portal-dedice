import { eq, inArray } from 'drizzle-orm'

import { asset, AssetTypeEnumType } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface AssetData {
  inheritanceProcedureId: number
  value: number
  name: string
  description?: string | null
  type: AssetTypeEnumType
  bankName?: string | null
  carMakeName?: string | null
  carRegistrationDate?: Date | null
  carType?: string | null
  cin?: string | null
}

export function getAssetRepository(db: Db) {
  // Get an asset by ID
  async function getAssetById(id: number) {
    const [result] = await db.select().from(asset).where(eq(asset.id, id))
    return result || null
  }

  // Get assets by their IDs
  async function getAssetsByIds(ids: number[]) {
    const results = await db.select().from(asset).where(inArray(asset.id, ids))

    return results
  }

  // Get all assets associated with a specific procedure
  async function getAssetsByProcedureId(procedureId: number) {
    return await db
      .select()
      .from(asset)
      .where(eq(asset.inheritanceProcedureId, procedureId))
      .then((assets) => assets)
  }

  // Create a new asset
  async function createAsset(data: AssetData): Promise<number> {
    const [result] = await db.insert(asset).values(data).$returningId()
    return result.id
  }

  // delete an asset by ID
  async function deleteAsset(id: number) {
    await db.delete(asset).where(eq(asset.id, id))
  }

  // Update an existing asset
  async function updateAsset(
    id: number,
    data: Partial<AssetData>
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

import { eq, inArray } from 'drizzle-orm'

import { asset } from '@backend/db/schema'
import { Db } from '@backend/types/types'

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

  return {
    getAssetById,
    getAssetsByIds,
    getAssetsByProcedureId,
  }
}

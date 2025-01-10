import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { notaryDateRule } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface NotaryDateRuleEntity
  extends InferSelectModel<typeof notaryDateRule> {}
export interface NotaryDateRuleInsertInput
  extends InferInsertModel<Omit<typeof notaryDateRule, 'id'>> {}

export function getNotaryDateRuleRepository(db: Db) {
  async function getNotaryDateRuleById(
    id: number
  ): Promise<NotaryDateRuleEntity> {
    const [result] = await db
      .select()
      .from(notaryDateRule)
      .where(eq(notaryDateRule.id, id))
    return result
  }

  async function getNotaryDateRulesByNotaryId(
    id: number
  ): Promise<NotaryDateRuleEntity[]> {
    const results = await db
      .select()
      .from(notaryDateRule)
      .where(eq(notaryDateRule.notaryId, id)) // Correct column name
    return results
  }

  async function createNotaryDateRule(
    data: NotaryDateRuleInsertInput
  ): Promise<number> {
    const [result] = await db.insert(notaryDateRule).values(data).$returningId()
    return result.id
  }

  async function createNotaryDateRules(
    data: NotaryDateRuleInsertInput[]
  ): Promise<number[]> {
    const results = await db.insert(notaryDateRule).values(data).$returningId()
    return results.map((rule) => rule.id)
  }

  // Update an existing Address
  async function updateNotaryDateRuleById(
    id: number,
    data: Partial<NotaryDateRuleInsertInput>
  ): Promise<void> {
    await db.update(notaryDateRule).set(data).where(eq(notaryDateRule.id, id))
  }

  // Delete an Address by ID
  async function deleteNotaryDateRulesByIds(ids: number[]): Promise<void> {
    await db.delete(notaryDateRule).where(inArray(notaryDateRule.id, ids))
  }

  return {
    createNotaryDateRule,
    getNotaryDateRulesByNotaryId,
    getNotaryDateRuleById,
    createNotaryDateRules,
    updateNotaryDateRuleById,
    deleteNotaryDateRulesByIds,
  }
}

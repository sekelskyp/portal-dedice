import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'

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

  async function createNotaryDateRules(
    data: NotaryDateRuleInsertInput[]
  ): Promise<number[]> {
    const results = await db.insert(notaryDateRule).values(data).$returningId()
    return results.map((rule) => rule.id)
  }

  return {
    getNotaryDateRuleById,
    createNotaryDateRules,
  }
}

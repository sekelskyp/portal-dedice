import { eq } from 'drizzle-orm'

import { notaryDateRule } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface NotaryDateRuleData {
  notaryId: number
  startDay: number
  endDay: number
  startMonth: number
  endMonth: number
}

export function getNotaryDateRuleRepository(db: Db) {
  async function getNotaryDateRuleById(id: number) {
    const [result] = await db
      .select()
      .from(notaryDateRule)
      .where(eq(notaryDateRule.id, id))
    return result
  }

  async function createNotaryDateRules(
    data: NotaryDateRuleData[]
  ): Promise<number[]> {
    const results = await db.insert(notaryDateRule).values(data).$returningId()
    return results.map((rule) => rule.id)
  }

  return {
    getNotaryDateRuleById,
    createNotaryDateRules,
  }
}

import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { NotaryDateRuleInput } from './notaryDateRuleInput'
import { NotaryDateRule } from './notaryDateRuleType'

@Resolver(() => NotaryDateRule)
export class NotaryDateRuleResolver {
  // ===============================
  // QUERIES
  // ===============================

  // Query to get an notaryDateRule by ID
  @Query(() => NotaryDateRule, { nullable: true })
  async getNotaryDateRuleById(
    @Arg('id', () => Int) id: number,
    @Ctx() { notaryDateRuleRepository }: CustomContext
  ): Promise<NotaryDateRule | null> {
    return await notaryDateRuleRepository.getNotaryDateRuleById(id)
  }

  // Query to get notaryDateRules by notary ID
  @Query(() => [NotaryDateRule])
  async getNotaryDateRulesByNotary(
    @Arg('notaryId', () => Int) notaryId: number,
    @Ctx() { notaryDateRuleRepository }: CustomContext
  ): Promise<NotaryDateRule[]> {
    return await notaryDateRuleRepository.getNotaryDateRulesByNotaryId(notaryId)
  }

  // ===============================
  // MUTATIONS
  // ===============================

  // Mutation to create a new notaryDateRule
  @Mutation(() => NotaryDateRule)
  async createNotaryDateRule(
    @Arg('data') data: NotaryDateRuleInput,
    @Ctx() { notaryDateRuleRepository }: CustomContext
  ): Promise<NotaryDateRule> {
    const notaryDateRuleId =
      await notaryDateRuleRepository.createNotaryDateRule(data)
    const notaryDateRule =
      await notaryDateRuleRepository.getNotaryDateRuleById(notaryDateRuleId)
    if (!notaryDateRule) {
      throw new Error('Vytvořené pravidlo se nepodařilo najít')
    }
    return notaryDateRule
  }

  // Mutation to update an existing notaryDateRule
  @Mutation(() => NotaryDateRule, { nullable: true })
  async updateNotaryDateRule(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: NotaryDateRuleInput,
    @Ctx() { notaryDateRuleRepository }: CustomContext
  ): Promise<NotaryDateRule> {
    await notaryDateRuleRepository.updateNotaryDateRuleById(id, data)
    const notaryDateRule =
      await notaryDateRuleRepository.getNotaryDateRuleById(id)
    if (!notaryDateRule) {
      throw new Error('Upravené pravidlo se nepodařilo najít')
    }
    return notaryDateRule
  }

  // Mutation to delete an notaryDateRule by IDs
  @Mutation(() => Boolean)
  async deleteNotaryDateRules(
    @Arg('ids', () => Int) ids: number[],
    @Ctx() { notaryDateRuleRepository }: CustomContext
  ): Promise<boolean> {
    if (!ids || ids.length === 0) {
      return true
    }
    await notaryDateRuleRepository.deleteNotaryDateRulesByIds(ids)
    return true
  }
}

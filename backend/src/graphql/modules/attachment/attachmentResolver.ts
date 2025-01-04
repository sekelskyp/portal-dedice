import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'

import {
  deleteAttachmentsByIds,
  getAttachmentById,
  getAttachmentsByIds,
} from '@backend/services/attachmentService'
import { CustomContext } from '@backend/types/types'

import { Attachment } from './attachmentType'

@Resolver()
export class AttachmentResolver {
  @Mutation(() => Boolean)
  async deleteAttachmentsByIds(
    @Arg('ids', () => [ID]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await deleteAttachmentsByIds(ids, context)
    return true
  }

  @Query(() => Attachment, { nullable: true })
  async getAttachmentById(
    @Arg('id', () => ID) id: number,
    @Ctx() context: CustomContext
  ): Promise<Attachment | null> {
    return await getAttachmentById(id, context)
  }

  @Query(() => [Attachment])
  async getAttachmentsByIds(
    @Arg('ids', () => [ID]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<Attachment[]> {
    return await getAttachmentsByIds(ids, context)
  }
}

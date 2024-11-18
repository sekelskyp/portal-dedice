import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'

import {
  createDocument,
  CreateDocumentInput,
  deleteDocumentsByIds,
  getDocumentById,
  getDocumentsByIds,
} from '@backend/services/documentService'
import { CustomContext } from '@backend/types/types'

import { UploadDocumentInput } from './createDocumentInput'
import { DocumentCopy } from './documentCopy'

@Resolver()
export class DocumentResolver {
  @Mutation(() => ID)
  async createDocument(
    @Arg('data') data: UploadDocumentInput,
    @Ctx() context: CustomContext
  ): Promise<number> {
    const documentData: CreateDocumentInput = {
      file: data.file,
      userOwnerId: data.userOwnerId || null,
      taskId: data.taskId || null,
      inheritanceProcedureId: data.inheritanceProcedureId,
    }
    return await createDocument(documentData, context)
  }

  @Mutation(() => Boolean)
  async deleteDocumentsByIds(
    @Arg('ids', () => [ID]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await deleteDocumentsByIds(ids, context)
    return true
  }

  @Query(() => DocumentCopy, { nullable: true })
  async getDocumentById(
    @Arg('id', () => ID) id: number,
    @Ctx() context: CustomContext
  ): Promise<Document | null> {
    return await getDocumentById(id, context)
  }

  @Query(() => [DocumentCopy])
  async getDocumentsByIds(
    @Arg('ids', () => [ID]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<Document[]> {
    return await getDocumentsByIds(ids, context)
  }
}

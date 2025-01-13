import { ArticleEntity } from '@backend/graphql/modules/article/articleRepository'
import { CustomContext } from '@backend/types/types'

import {
  createAttachment,
  deleteAttachmentsByIds,
} from '../attachment/attachmentService'

export interface FileData {
  stream: NodeJS.ReadableStream
  filename: string
  mimetype: string
}

export interface CreateArticleInput {
  title: string
  date: Date
  content: string
  // cover image data
  fileData: FileData
}

export interface UpdateArticleInput {
  title?: string
  date?: Date
  content?: string
  fileData?: FileData
}

export async function createArticle(
  input: CreateArticleInput,
  context: CustomContext
): Promise<number> {
  const attachmentId = await createAttachment(input.fileData, context)
  const articleData = {
    title: input.title,
    date: input.date,
    content: input.content,
    coverImageAttachmentId: attachmentId,
  }
  // return the ID of the new article record
  return context.articleRepository.createArticle(articleData)
}

export async function updateArticle(
  id: number,
  input: UpdateArticleInput,
  context: CustomContext
): Promise<boolean> {
  const article = await context.articleRepository.getArticleById(id)
  if (!article) {
    throw new Error('Article not found')
  }
  let attachmentId: number | null = article.coverImageAttachmentId
  if (input.fileData) {
    // If new cover image data is provided, create a new attachment
    attachmentId = await createAttachment(input.fileData, context)
    // Delete the old cover image attachment if it exists
    if (article?.coverImageAttachmentId) {
      await deleteAttachmentsByIds([article.coverImageAttachmentId], context)
    }
  } else {
    // Retain the old cover image attachment ID if no new data is provided
    attachmentId = article.coverImageAttachmentId
  }

  // Prepare the article data for updating
  const articleData = {
    title: input.title,
    date: input.date,
    content: input.content,
    coverImageAttachmentId: attachmentId,
  }
  // Update the article in the repository
  context.articleRepository.updateArticleById(id, articleData)
  return true
}

export async function getArticleById(
  id: number,
  context: CustomContext
): Promise<ArticleEntity | null> {
  return context.articleRepository.getArticleById(id)
}

export async function getAllArticles(
  context: CustomContext
): Promise<ArticleEntity[]> {
  return context.articleRepository.getAllArticles()
}

export async function getArticlesByIds(
  ids: number[],
  context: CustomContext
): Promise<ArticleEntity[]> {
  return context.articleRepository.getArticlesByIds(ids)
}

export async function deleteArticlesByIds(
  ids: number[],
  context: CustomContext
): Promise<void> {
  if (!context.authUser) {
    throw new Error('Not authenticated')
  }
  const userRecord = await context.userRepository.getUserById(
    context.authUser.userId
  )
  if (!userRecord) {
    throw new Error('User not found')
  }
  if (userRecord.type !== 'Admin') {
    throw new Error('Not authorized')
  }

  // delete the attachment (cover image)
  await deleteAttachmentsByIds(ids, context)
  // Delete the article records from the database
  await context.articleRepository.deleteArticlesByIds(ids)
}

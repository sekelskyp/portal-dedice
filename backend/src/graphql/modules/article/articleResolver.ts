import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { Article } from '@backend/graphql/modules/article/articleType'
import { getAttachmentById } from '@backend/graphql/modules/attachment/attachmentService'
import { CustomContext } from '@backend/types/types'

import { Attachment } from '../attachment/attachmentType'

import {
  createArticle,
  deleteArticlesByIds,
  getAllArticles,
  getArticleById,
  updateArticle,
} from './articleService'
import { CreateArticleInput } from './createArticleInput'
import { UpdateArticleInput } from './updateArticleInput'

@Resolver(() => Article)
export class ArticleResolver {
  // ----------------------------------
  // QUERIES
  // ----------------------------------

  // Query to get an article by ID
  @Query(() => Article, { nullable: true })
  async getArticleById(
    @Arg('id', () => Int) id: number,
    @Ctx() context: CustomContext
  ): Promise<Article | null> {
    return await getArticleById(id, context)
  }

  // Query to get all articles
  @Query(() => [Article])
  async getAllArticles(@Ctx() context: CustomContext): Promise<Article[]> {
    const result = await getAllArticles(context)
    return result
  }

  // ----------------------------------
  // MUTATIONS
  // ----------------------------------

  // Mutation to create a new article
  @Mutation(() => Article)
  async createArticle(
    @Arg('data') data: CreateArticleInput,
    @Ctx() context: CustomContext
  ): Promise<Article> {
    // Destructure and extract the file details
    const { createReadStream, filename, mimetype } = await data.coverImage // WARNING - THIS HAS TO BE AWAITED - VSCODE IS WRONG
    const stream = createReadStream()
    const fileDataInput = {
      stream: stream,
      filename: filename,
      mimetype: mimetype,
    }
    const attachmentData = {
      title: data.title,
      date: data.date,
      content: data.content,
      fileData: fileDataInput,
    }
    const articleId = await createArticle(attachmentData, context)
    const article = await getArticleById(articleId, context)
    if (!article) {
      throw new Error('Article was created but could not be fetched')
    }
    return article
  }

  // Mutation to update an existing article
  @Mutation(() => Article, { nullable: true })
  async updateArticle(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateArticleInput,
    @Ctx() context: CustomContext
  ): Promise<Article | null> {
    // Start with the base update data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = { ...data }

    // Add fileData dynamically if coverImage is provided
    if (data.coverImage) {
      const { createReadStream, filename, mimetype } = await data.coverImage
      updateData.fileData = {
        stream: createReadStream(),
        filename,
        mimetype,
      }
    }

    // Update the article
    const isUpdated = await updateArticle(id, updateData, context)

    if (!isUpdated) {
      throw new Error('Failed to update article')
    }

    // Fetch and return the updated article
    return await context.articleRepository.getArticleById(id)
  }

  // Mutation to delete multiple articles by IDs
  @Mutation(() => Boolean)
  async deleteArticles(
    @Arg('ids', () => [Int]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await deleteArticlesByIds(ids, context)
    return true
  }

  // ----------------------------------
  // FIELD RESOLVERS
  // ----------------------------------

  // Field Resolver to fetch the main beneficiary
  @FieldResolver(() => Attachment, { nullable: true })
  async attachment(
    @Root() article: Article,
    @Ctx() context: CustomContext
  ): Promise<Attachment | null> {
    if (!article.coverImageAttachmentId) {
      return null
    }
    return await getAttachmentById(article.coverImageAttachmentId, context)
  }
}

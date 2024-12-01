import { Readable } from 'stream'
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { Article } from '@backend/graphql/modules/article/articleType'
import { CustomContext } from '@backend/types/types'

import { CreateArticleInput } from './createArticleInput'
import { UpdateArticleInput } from './updateArticleInput'

async function encodeStreamToBase64(stream: Readable): Promise<string> {
  const chunks: Buffer[] = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')))
    stream.on('error', (err) => reject(err))
  })
}

@Resolver(() => Article)
export class ArticleResolver {
  // ----------------------------------
  // QUERIES
  // ----------------------------------

  // Query to get an article by ID
  @Query(() => Article, { nullable: true })
  async getArticleById(
    @Arg('id', () => Int) id: number,
    @Ctx() { articleRepository }: CustomContext
  ): Promise<Article | null> {
    return await articleRepository.getArticleById(id)
  }

  // Query to get all articles
  @Query(() => [Article])
  async getAllArticles(
    @Ctx() { articleRepository }: CustomContext
  ): Promise<Article[]> {
    return await articleRepository.getAllArticles()
  }

  // ----------------------------------
  // MUTATIONS
  // ----------------------------------

  // Mutation to create a new article
  @Mutation(() => Article)
  async createArticle(
    @Arg('data') data: CreateArticleInput,
    @Ctx() { articleRepository }: CustomContext
  ): Promise<Article> {
    // Destructure and extract the file details
    const { createReadStream, filename, mimetype } = data.coverImage
    const stream = createReadStream()

    // Encode the file stream to Base64
    const base64CoverPicture = await encodeStreamToBase64(stream)

    // Prepare the data for saving
    const articleCreateData = {
      title: data.title,
      date: data.date,
      content: data.content,
      fileName: filename,
      fileType: mimetype,
      coverImage: base64CoverPicture,
    }

    // Save the article and fetch it
    const articleId = await articleRepository.createArticle(articleCreateData)
    const article = await articleRepository.getArticleById(articleId)
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
    @Ctx() { articleRepository }: CustomContext
  ): Promise<Article | null> {
    const article = await articleRepository.getArticleById(id)
    if (!article) {
      throw new Error('Article not found')
    }
    let updateData: {
      title: string | undefined
      date: Date | undefined
      content: string | undefined
      fileName?: string
      fileType?: string
      coverImage?: string
    } = {
      title: data.title,
      date: data.date,
      content: data.content,
    }
    if (data.coverImage) {
      const { createReadStream, filename, mimetype } = data.coverImage
      const stream = createReadStream()
      const base64CoverPicture = await encodeStreamToBase64(stream)
      const fileName = filename
      const fileType = mimetype
      const coverImage = base64CoverPicture
      updateData = { ...updateData, fileName, fileType, coverImage }
    }

    await articleRepository.updateArticleById(article.id, updateData)
    return await articleRepository.getArticleById(id)
  }

  // Mutation to delete multiple articles by IDs
  @Mutation(() => Boolean)
  async deleteArticles(
    @Arg('ids', () => [Int]) ids: number[],
    @Ctx() context: CustomContext
  ): Promise<boolean> {
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

    await context.articleRepository.deleteArticlesByIds(ids)
    return true
  }
}

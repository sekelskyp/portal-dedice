import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { Article } from '@backend/graphql/modules/article/articleType'
import { CustomContext } from '@backend/types/types'

import { ArticleInput } from './articleInput'

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
    @Arg('data') data: ArticleInput,
    @Ctx() { articleRepository }: CustomContext
  ): Promise<Article> {
    const articleId = await articleRepository.createArticle(data)
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
    @Arg('data') data: ArticleInput,
    @Ctx() { articleRepository }: CustomContext
  ): Promise<Article | null> {
    const article = await articleRepository.getArticleById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    await articleRepository.updateArticleById(article.id, data)
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

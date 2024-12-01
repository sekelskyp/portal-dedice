import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { article } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface ArticleEntity extends InferSelectModel<typeof article> {}
export interface ArticleInsertInput
  extends InferInsertModel<Omit<typeof article, 'id'>> {}

export function getArticleRepository(db: Db) {
  async function createArticle(data: ArticleInsertInput): Promise<number> {
    const [result] = await db.insert(article).values(data).$returningId()
    return result.id
  }

  async function getArticleById(id: number): Promise<ArticleEntity | null> {
    const [result] = await db.select().from(article).where(eq(article.id, id))
    return result || null
  }

  async function getAllArticles(): Promise<ArticleEntity[]> {
    const result = await db.select().from(article)
    return result
  }

  async function updateArticleById(
    id: number,
    data: Partial<ArticleInsertInput>
  ) {
    const result = await db.update(article).set(data).where(eq(article.id, id))
    return result
  }

  async function deleteArticlesByIds(ids: number[]): Promise<void> {
    await db.delete(article).where(inArray(article.id, ids))
  }

  async function getArticlesByIds(ids: number[]): Promise<ArticleEntity[]> {
    const results = await db
      .select()
      .from(article)
      .where(inArray(article.id, ids))
    return results
  }

  return {
    createArticle,
    getArticleById,
    getAllArticles,
    updateArticleById,
    deleteArticlesByIds,
    getArticlesByIds,
  }
}

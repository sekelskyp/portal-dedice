import { useMemo, useState } from 'react'

import { Article } from '../components/ArticleCard'

interface UseArticleSearchProps<T extends Article> {
  articles: T[]
}

export function useArticleSearch<T extends Article>({
  articles,
}: UseArticleSearchProps<T>) {
  const [query, setQuery] = useState('')

  const clearQuery = () => setQuery('')

  const filteredArticles = useMemo(() => {
    if (!query) return articles

    const lowercaseSearch = query.toLowerCase()
    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(lowercaseSearch) ||
        article.description.toLowerCase().includes(lowercaseSearch) ||
        article.createDate.toLowerCase().includes(lowercaseSearch)
      )
    })
  }, [query, articles])

  return { query, setQuery, clearQuery, filteredArticles }
}

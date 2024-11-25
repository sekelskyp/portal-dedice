import { useMemo, useState } from 'react'

import { Article } from '../components/ArticleCard'

interface UseArticleProps<T extends Article> {
  articles: T[]
}

export function useArticle<T extends Article>({
  articles,
}: UseArticleProps<T>) {
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const clearQuery = () => setQuery('')

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }

  const filteredArticles = useMemo(() => {
    let filtered = articles
    if (query) {
      const lowercaseSearch = query.toLowerCase()
      filtered = filtered.filter((article) => {
        return (
          article.title.toLowerCase().includes(lowercaseSearch) ||
          article.description.toLowerCase().includes(lowercaseSearch) ||
          article.createDate.toLowerCase().includes(lowercaseSearch)
        )
      })
    }
    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return (
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
        )
      } else {
        return (
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        )
      }
    })
  }, [query, articles, sortOrder])

  return {
    query,
    setQuery,
    clearQuery,
    filteredArticles,
    sortOrder,
    toggleSortOrder,
  }
}

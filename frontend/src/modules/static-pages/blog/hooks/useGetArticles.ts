import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_ALL_ARTICLES = gql(/* GraphQL */ `
  query GetAllArticles {
    getAllArticles {
      id
      date
      title
      content
      coverImage
    }
  }
`)

export function useGetArticles() {
  const { data, loading, error } = useQuery(GET_ALL_ARTICLES)

  return {
    data,
    loading,
    error,
  }
}

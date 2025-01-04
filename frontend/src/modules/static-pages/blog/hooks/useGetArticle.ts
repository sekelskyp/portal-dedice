import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

export const GET_ARTICLE_BY_ID = gql(/* GraphQL */ `
  query GetArticleById($getArticleByIdId: Int!) {
    getArticleById(id: $getArticleByIdId) {
      id
      date
      title
      content
      coverImageAttachmentId
      attachment {
        id
        fileUuid
        mimetype
      }
    }
  }
`)

export function useGetArticle(articleId: number) {
  const { data, loading, error } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      getArticleByIdId: articleId,
    },
  })
  return {
    data,
    loading,
    error,
  }
}

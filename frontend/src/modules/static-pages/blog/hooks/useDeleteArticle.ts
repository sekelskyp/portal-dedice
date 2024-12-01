import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'
import { route } from '@shared/route'

const DELETE_ARTICLE = gql(/* GraphQL */ `
  mutation DeleteArticle($ids: [Int!]!) {
    deleteArticles(ids: $ids)
  }
`)

export function useDeleteArticle() {
  const navigate = useNavigate()

  const [deleteArticleRequest, deleteArticleRequestState] = useMutation(
    DELETE_ARTICLE,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Článek byl úspěšně smazán.',
          type: 'success',
          duration: 5000,
        })
        navigate(route.blog())
      },
      onError: () => {
        toaster.create({
          title: 'Při mazání článku došlo k chybě.',
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [deleteArticleRequest, deleteArticleRequestState] as const
}

import { useMutation } from '@apollo/client'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'

const UPDATE_ARTICLE = gql(/* GraphQL */ `
  mutation UpdateArticle($data: UpdateArticleInput!, $updateArticleId: Int!) {
    updateArticle(data: $data, id: $updateArticleId) {
      id
    }
  }
`)

export function useUpdateArticle() {
  const [updateArticleRequest, updateArticleRequestState] = useMutation(
    UPDATE_ARTICLE,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Článek byl úspěšně upraven.',
          type: 'success',
          duration: 5000,
        })
      },
      onError: (error) => {
        toaster.create({
          title: error.message,
          type: 'error',
          duration: 5000,
        })
      },
    }
  )

  return [updateArticleRequest, updateArticleRequestState] as const
}

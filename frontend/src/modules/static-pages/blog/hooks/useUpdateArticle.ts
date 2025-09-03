import { useMutation } from '@apollo/client'
import { toaster } from '@components/ui/toaster'
import { gql } from '@src/gql'

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

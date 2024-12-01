import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'
import { route } from '@shared/route'

const CREATE_ARTICLE = gql(/* GraphQL */ `
  mutation CreateArticle($data: CreateArticleInput!) {
    createArticle(data: $data) {
      id
    }
  }
`)

export function useCreateArticle() {
  const navigate = useNavigate()

  const [createArticleRequest, createArticleRequestState] = useMutation(
    CREATE_ARTICLE,
    {
      onCompleted: () => {
        toaster.create({
          title: 'Článek byl úspěšně vytvořen.',
          type: 'success',
          duration: 5000,
        })
        navigate(route.blog())
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

  return [createArticleRequest, createArticleRequestState] as const
}

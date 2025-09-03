import { useMutation } from '@apollo/client'
import { toaster } from '@components/ui/toaster'
import { route } from '@lib/route'
import { gql } from '@src/gql'
import { useNavigate } from 'react-router-dom'

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

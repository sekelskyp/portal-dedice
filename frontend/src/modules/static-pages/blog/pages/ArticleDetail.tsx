import React, { useMemo, useState } from 'react'
import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { ActionDialog } from '@frontend/shared/components/ActionDialog'
import { Alert } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout/Page'

import { ArticleAdminPanel } from '../components/ArticleAdminPanel'
import { ArticleCard } from '../components/ArticleCard'
import { ArticleDetailCard } from '../components/ArticleDetailCard'
import { useDeleteArticle } from '../hooks/useDeleteArticle'
import { useGetArticle } from '../hooks/useGetArticle'
import { useGetArticles } from '../hooks/useGetArticles'
import { getLatestArticles } from '../utils/articleUtils'

export const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const articleId = parseInt(id ?? '0', 10)
  const { data, loading, error } = useGetArticle(articleId)
  const { data: allArticlesData } = useGetArticles()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteArticle] = useDeleteArticle()

  const article = data?.getArticleById
  const latestArticles = useMemo(
    () => getLatestArticles(allArticlesData?.getAllArticles, articleId),
    [allArticlesData, articleId]
  )

  if (loading) {
    return (
      <Page as={Stack} alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Page>
    )
  }

  if (error || !article) {
    return (
      <Page as={Stack}>
        <Alert status="error" title="Článek nebyl nalezen." />
      </Page>
    )
  }

  const handleDelete = () => {
    deleteArticle({
      variables: {
        ids: [articleId],
      },
    })
  }

  return (
    <Page>
      <ArticleAdminPanel
        onDelete={() => setIsDeleteDialogOpen(true)}
        articleId={articleId}
      />
      <Stack display="flex" alignItems="center" justifyContent="center">
        <ArticleDetailCard
          title={article.title}
          content={article.content}
          date={article.date}
          fileUuid={article.attachment?.fileUuid ?? ''}
        />
      </Stack>
      <Stack mt={8} alignItems="center">
        <Heading size={{ base: 'xl', md: '2xl' }}>
          Mohlo by vás také zajímat:
        </Heading>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={8}
          mt={8}
          w={{ base: 'full', md: '100%' }}
        >
          {latestArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              createDate={article.createDate}
              imageUrl={article.imageUrl}
            />
          ))}
        </Stack>
      </Stack>
      <ActionDialog
        title="Smazat článek"
        text="Opravdu chcete smazat tento článek?"
        isOpen={isDeleteDialogOpen}
        toggle={setIsDeleteDialogOpen}
        onConfirm={() => handleDelete()}
        selectedId={id}
      />
    </Page>
  )
}

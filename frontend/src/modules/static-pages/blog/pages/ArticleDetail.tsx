import React from 'react'
import {
  Box,
  Card,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuNewspaper } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { ActionDialog } from '@frontend/shared/components/ActionDialog'
import { Alert } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout/Page'

import { ArticleAdminPanel } from '../components/ArticleAdminPanel'
import { ArticleCard } from '../components/ArticleCard'
import { useDeleteArticle } from '../hooks/useDeleteArticle'
import { useGetArticle } from '../hooks/useGetArticle'
import { useGetArticles } from '../hooks/useGetArticles'

export const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const articleId = parseInt(id ?? '0', 10)
  const { data, loading, error } = useGetArticle(articleId)
  const { data: allArticlesData } = useGetArticles()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [deleteArticle] = useDeleteArticle()

  const article = data?.getArticleById
  const latestArticles = React.useMemo(() => {
    if (!allArticlesData?.getAllArticles) return []
    return allArticlesData.getAllArticles
      .filter((a) => parseInt(a.id) !== articleId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map((article) => ({
        id: parseInt(article.id),
        title: article.title,
        description: article.content,
        createDate: article.date,
        imageUrl: article.coverPicture,
      }))
  }, [allArticlesData, articleId])

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
      <ArticleAdminPanel onDelete={() => setIsDeleteDialogOpen(true)} />
      <Stack display="flex" alignItems="center" justifyContent="center">
        <Card.Root w="full" maxW="80%" variant="elevated">
          <Card.Header as={HStack} gap={2}>
            <LuNewspaper size={24} />
            <Heading size="2xl">{article.title}</Heading>
            <Text ml="auto" color="gray.500" fontSize="md">
              {new Date(article.date).toLocaleDateString()}
            </Text>
          </Card.Header>
          <Card.Body gap={2}>
            <Image
              src={
                article.coverPicture
                  ? article.coverPicture
                  : '/cover-fallback.png'
              }
              alt={article.title}
              borderRadius="lg"
              objectFit="cover"
              width="100%"
              height="300px"
            />
            <Box
              mt={2}
              px={2}
              css={{
                '& p': {
                  textAlign: 'justify',
                  marginBottom: '1rem',
                },
                '& ul, & ol': {
                  paddingLeft: '2rem',
                  marginBottom: '1rem',
                },
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Card.Body>
        </Card.Root>
      </Stack>

      <Stack mt={8} alignItems="center">
        <Heading size="2xl">Mohlo by vás také zajímat:</Heading>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={8}
          mt={8}
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

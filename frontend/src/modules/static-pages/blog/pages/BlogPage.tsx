import { Box, Heading, IconButton, Spinner, Stack } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { RiSortAsc, RiSortDesc } from 'react-icons/ri'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'
import { RouterNavLink } from '@frontend/shared/navigation/atoms/RouterNavLink'
import { route } from '@shared/route'

import { ArticleCard } from '../components/ArticleCard'
import { ArticleSearchBar } from '../components/ArticleSearchBar'
import { useArticle } from '../hooks/useArticle'
import { useGetArticles } from '../hooks/useGetArticles'
import { getArticleImageUrl } from '../utils/articleUtils'

export function BlogPage() {
  const { user } = useAuth()
  const { data, loading, error } = useGetArticles()
  const {
    query,
    setQuery,
    clearQuery,
    filteredArticles,
    sortOrder,
    toggleSortOrder,
  } = useArticle({
    articles: (data?.getAllArticles ?? []).map((article) => ({
      id: Number(article.id),
      title: article.title,
      description: article.content,
      createDate: article.date.split('T')[0],
      imageUrl: article.attachment?.fileUuid
        ? getArticleImageUrl({ fileUuid: article.attachment.fileUuid })
        : undefined,
    })),
  })

  if (loading) {
    return (
      <Page as={Stack} alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Page>
    )
  }

  if (error) {
    return (
      <Page as={Stack}>
        <Alert status="error" title="Chyba při načítání článků." />
      </Page>
    )
  }

  return (
    <Page as={Stack}>
      <Heading size="3xl" pb={4}>
        Mohlo by vás zajímat
      </Heading>
      <Stack direction="row" alignItems="center" flex={1} gap={4}>
        <ArticleSearchBar
          value={query}
          onChange={setQuery}
          onClear={clearQuery}
        />
        <IconButton
          onClick={toggleSortOrder}
          rounded="full"
          bg="gray.500"
          _hover={{ bg: 'gray.700' }}
          flexShrink={0}
        >
          {sortOrder === 'asc' ? <RiSortAsc /> : <RiSortDesc />}
        </IconButton>
        {user?.type === 'Admin' && (
          <RouterNavLink
            to={route.newArticle()}
            width={{ base: '10%', xl: 'auto' }}
            display="flex"
            justifySelf={'flex-end'}
            alignItems="center"
            gap={2}
          >
            <FaPlus />
            <Box display={{ base: 'none', xl: 'block' }}>Nový článek</Box>
          </RouterNavLink>
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        flexWrap="wrap"
        gap={8}
        mt={8}
      >
        {filteredArticles.map((article) => (
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
      {filteredArticles.length === 0 && (
        <Alert
          mt={-8}
          status="warning"
          title={
            query
              ? 'Žádné články neodpovídají vašemu hledání.'
              : 'Seznam článků je prázdný.'
          }
          width="fit-content"
        />
      )}
    </Page>
  )
}

import { Box, Heading, IconButton, Stack } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { RiSortAsc, RiSortDesc } from 'react-icons/ri'

import { Alert } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'
import { RouterNavLink } from '@frontend/shared/navigation/atoms/RouterNavLink'
import { route } from '@shared/route'

import { ArticleCard } from '../components/ArticleCard'
import { ArticleSearchBar } from '../components/ArticleSearchBar'
import { dummyData } from '../dummyData'
import { useArticle } from '../hooks/useArticle'

//TODO: add routing to article detail page
//TODO: add loading and error states
//TODO: add empty check
//TODO: consider adding infinite scroll or pagination
//TODO: add responsive design

export function BlogPage() {
  const {
    query,
    setQuery,
    clearQuery,
    filteredArticles,
    sortOrder,
    toggleSortOrder,
  } = useArticle({
    articles: dummyData,
  })

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
          title="Žádné články neodpovídají vašemu hledání."
          width="fit-content"
        />
      )}
    </Page>
  )
}

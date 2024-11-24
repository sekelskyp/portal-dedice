import { Heading, Stack } from '@chakra-ui/react'

import { Alert } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'

import { ArticleCard } from '../components/ArticleCard'
import { ArticleSearchBar } from '../components/ArticleSearchBar'
import { dummyData } from '../dummyData'
import { useArticleSearch } from '../hooks/useArticleSearch'

//TODO: add routing to article detail page
//TODO: add loading and error states
//TODO: add empty check
//TODO: consider adding infinite scroll or pagination
//TODO: add sorting, filtering and search options (maybe out of scope?)
//TODO: add responsive design

export function BlogPage() {
  const { query, setQuery, clearQuery, filteredArticles } = useArticleSearch({
    articles: dummyData,
  })

  return (
    <Page as={Stack}>
      <Heading size="3xl" pb={4}>
        Mohlo by vás zajímat
      </Heading>
      <ArticleSearchBar
        value={query}
        onChange={setQuery}
        onClear={clearQuery}
      />
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

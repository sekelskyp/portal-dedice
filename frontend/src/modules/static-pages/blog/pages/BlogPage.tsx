import { Heading, Stack } from '@chakra-ui/react'

import { Page } from '@frontend/shared/layout'

import { ArticleCard } from '../components/ArticleCard'
import { dummyData } from '../dummyData'

//TODO: add routing to article detail page
//TODO: add loading and error states
//TODO: add empty check
//TODO: consider adding infinite scroll or pagination
//TODO: add sorting, filtering and search options (maybe out of scope?)
//TODO: add responsive design

export function BlogPage() {
  return (
    <Page as={Stack}>
      <Heading size="3xl" pb={4}>
        Mohlo by vás zajímat
      </Heading>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={8}>
        {dummyData.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            createDate={article.createDate}
            imageUrl={article.imageUrl}
          />
        ))}
      </Stack>
    </Page>
  )
}

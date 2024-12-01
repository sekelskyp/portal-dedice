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

import { Page } from '@frontend/shared/layout/Page'

import { ArticleAdminPanel } from '../components/ArticleAdminPanel'
import { ArticleCard } from '../components/ArticleCard'
import { dummyData } from '../dummyData'

export const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const article = dummyData.find(
    (article) => article.id === parseInt(id ?? '0', 10)
  )

  const latestArticles = React.useMemo(() => {
    return dummyData
      .filter((a) => a.id !== parseInt(id ?? '0', 10))
      .sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      )
      .slice(0, 3)
  }, [id])

  if (!article) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Page>
      <ArticleAdminPanel />
      <Stack display="flex" alignItems="center" justifyContent="center">
        <Card.Root w="full" maxW="80%" variant="elevated">
          <Card.Header as={HStack} gap={2}>
            <LuNewspaper size={24} />
            <Heading size="2xl">{article.title}</Heading>
            <Text ml="auto" color="gray.500" fontSize="md">
              {new Date(article.createDate).toLocaleDateString()}
            </Text>
          </Card.Header>
          <Card.Body gap={2}>
            <Image
              src={article.imageUrl}
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
              dangerouslySetInnerHTML={{ __html: article.description }}
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
    </Page>
  )
}

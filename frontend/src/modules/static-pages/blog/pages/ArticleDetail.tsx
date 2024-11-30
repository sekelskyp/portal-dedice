import React from 'react'
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuArrowLeft, LuNewspaper } from 'react-icons/lu'
import { useNavigate, useParams } from 'react-router-dom'

import { Page } from '@frontend/shared/layout/Page'
import { route } from '@shared/route'

import { ArticleCard } from '../components/ArticleCard'
import { dummyData } from '../dummyData'

export const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
      <Button variant="ghost" mb={4} onClick={() => navigate(route.blog())}>
        <LuArrowLeft />
      </Button>
      <Stack display="flex" alignItems="center" justifyContent="center">
        <Card.Root w="full" maxW="80%" variant="elevated">
          <Card.Header as={HStack} gap={2}>
            <LuNewspaper size={24} />
            <Heading size="4xl">{article.title}</Heading>
            <Text ml="auto" color="gray.500" fontSize="sm">
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
            <Text fontSize="md" mt={2}>
              {article.description}
            </Text>
          </Card.Body>
        </Card.Root>
      </Stack>

      <Stack mt={8} alignItems="center">
        <Heading size="lg" mb={4}>
          Nejnovější články
        </Heading>
        <HStack gap={4} wrap="wrap" justify="center">
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
        </HStack>
      </Stack>
    </Page>
  )
}

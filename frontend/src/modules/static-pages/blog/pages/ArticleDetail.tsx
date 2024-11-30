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

import { dummyData } from '../dummyData'

export const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = dummyData.find(
    (article) => article.id === parseInt(id ?? '0', 10)
  )

  if (!article) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Page>
      <Button variant="ghost" mb={4} onClick={() => navigate(-1)}>
        <LuArrowLeft />
      </Button>
      <Stack display="flex" alignItems="center" justifyContent="center">
        <Card.Root w="full" maxW="80%">
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
    </Page>
  )
}

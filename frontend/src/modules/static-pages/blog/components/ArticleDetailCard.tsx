import { Box, Card, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { LuNewspaper } from 'react-icons/lu'

import { getArticleImageUrl } from '../utils/articleUtils'

export function ArticleDetailCard({
  title,
  date,
  fileUuid,
  content,
}: {
  title: string
  date: string
  fileUuid: string
  content: string
}) {
  return (
    <Card.Root w="full" maxW={{ base: '100%', md: '85%' }} variant="elevated">
      <Card.Header as={HStack} gap={2}>
        <LuNewspaper size={24} />
        <Heading size={{ base: 'md', sm: 'lg', md: '2xl' }}>{title}</Heading>
        <Text ml="auto" color="gray.500" fontSize="md">
          {new Date(date).toLocaleDateString()}
        </Text>
      </Card.Header>
      <Card.Body gap={2}>
        <Image
          src={
            fileUuid
              ? getArticleImageUrl({
                  fileUuid: fileUuid,
                })
              : '/cover-fallback.png'
          }
          alt={title}
          borderRadius="lg"
          objectFit="cover"
          width="100%"
          height={{ base: '200px', md: '500px' }}
        />
        <Box
          mt={2}
          px={2}
          className="ql-editor"
          css={{
            '& p': {
              textAlign: 'justify',
              marginBottom: '1rem',
            },
            '& ul, & ol': {
              paddingLeft: '2rem',
              marginBottom: '1rem',
            },
            '& a': {
              color: 'blue.500',
              textDecoration: 'underline',
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Card.Body>
    </Card.Root>
  )
}

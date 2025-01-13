import { Card, Image, Text } from '@chakra-ui/react'

import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

export type Article = {
  id: number
  title: string
  description: string
  createDate: string
  imageUrl?: string
}

export function ArticleCard({
  id,
  title,
  description,
  createDate,
  imageUrl,
}: Article) {
  return (
    <Card.Root
      w={{ base: 'sm', md: 'md' }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      variant="elevated"
    >
      <Image
        src={imageUrl ? imageUrl : '/cover-fallback.png'}
        borderTopRadius="xl"
        height="250px"
        objectFit="cover"
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Text color="gray" fontSize="sm" py={1}>
          {new Date(createDate).toLocaleDateString()}
        </Text>
        <Card.Description
          textAlign="justify"
          display="-webkit-box"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          fontSize="md"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Card.Body>
      <Card.Footer gap="2">
        <RouterNavLink to={route.detailArticle(id.toString())}>
          Zobrazit více
        </RouterNavLink>
      </Card.Footer>
    </Card.Root>
  )
}

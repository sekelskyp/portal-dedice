import { Card, Image, Text } from '@chakra-ui/react'

import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

export type Article = {
  id: number
  title: string
  description: string
  createDate: string
  imageUrl: string
}

export function ArticleCard({
  title,
  description,
  createDate,
  imageUrl,
}: Article) {
  return (
    <Card.Root
      maxW={{ base: 'sm', md: 'md' }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      variant="elevated"
    >
      <Image
        src={imageUrl}
        borderTopRadius="xl"
        height="250px"
        objectFit="cover"
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Text color="gray" fontSize="sm" py={1}>
          {createDate}
        </Text>
        <Card.Description textAlign="justify">{description}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <RouterNavLink to={route.home()}>Zobrazit více</RouterNavLink>
      </Card.Footer>
    </Card.Root>
  )
}

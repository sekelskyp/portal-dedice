import { ReactNode } from 'react'
import { Flex, Image, SimpleGrid } from '@chakra-ui/react'

interface SplitWithImageProps {
  imageSrc: string
  imageAlt: string
  children: ReactNode
}

export const SplitWithImage = ({
  imageSrc,
  imageAlt,
  children,
}: SplitWithImageProps) => (
  <SimpleGrid
    columns={{
      base: 1,
      md: 2,
    }}
    gridGap={0}
    gap={{
      base: 4,
      md: 8,
      lg: 12,
    }}
    my={10}
  >
    <Flex
      direction="column"
      alignItems="start"
      justifyContent="center"
      py={24}
      zIndex={3}
      gap={4}
      pl={4}
    >
      {children}
    </Flex>
    <Flex bg="brand.400">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fit="cover"
        w="full"
        h={{
          base: 64,
          md: 'full',
        }}
        bg="gray.100"
        loading="lazy"
        opacity={0.8}
        borderRadius={'lg'}
      />
    </Flex>
  </SimpleGrid>
)

import { Box, Link } from '@chakra-ui/react'

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from '@frontend/shared/design-system'

export interface AccordionHelperItemProps {
  title: string
  description: string
}

export function AccordionHelperItem({
  title,
  description,
}: AccordionHelperItemProps) {
  const renderDescription = (text: string) => {
    const urlRegex: RegExp = /(https?:\/\/[^\s]+)/g
    const parts: string[] = text.split(urlRegex)

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <Link
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.500"
          _visited={{ color: 'purple.500' }}
        >
          {part}
        </Link>
      ) : (
        part
      )
    )
  }

  return (
    <AccordionItem bg="gray.200" mb={4} borderRadius="xl" value="">
      <AccordionItemTrigger
        pl={{ base: 4, sm: 6 }}
        borderRadius="xl"
        _hover={{ borderRadius: 'none' }}
        fontSize={{ base: 'xs', sm: 'md' }}
        py={4}
      >
        <Box as="span" flex="1" textAlign="left">
          {title}
        </Box>
      </AccordionItemTrigger>
      <AccordionItemContent
        bg="gray.100"
        borderBottomRadius="xl"
        fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
        pt={4}
      >
        {renderDescription(description)}
      </AccordionItemContent>
    </AccordionItem>
  )
}

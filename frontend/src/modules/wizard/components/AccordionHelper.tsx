import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
} from '@chakra-ui/react'

interface AccordionHelperProps {
  items: AccordionHelperItemProps[]
}

interface AccordionHelperItemProps {
  title: string
  description: string
}

const AccordionHelperItem = ({
  title,
  description,
}: AccordionHelperItemProps) => {
  const renderDescription = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

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
    <AccordionItem bg="gray.200" mb={4} borderRadius="xl">
      <AccordionButton
        pl={6}
        borderRadius="xl"
        _hover={{ borderRadius: 'none' }}
        fontSize="lg"
        py={4}
      >
        <Box as="span" flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        bg="gray.100"
        borderBottomRadius="xl"
        fontSize="md"
        pt={4}
      >
        {renderDescription(description)}
      </AccordionPanel>
    </AccordionItem>
  )
}

export function AccordionHelper({ items }: AccordionHelperProps) {
  return (
    <Accordion allowMultiple py={4}>
      {items.map((item) => (
        <AccordionHelperItem key={item.title} {...item} />
      ))}
    </Accordion>
  )
}

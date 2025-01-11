import { ReactNode } from 'react'
import {
  Box,
  Container,
  Heading,
  IconButton,
  List,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'

interface StepLayoutProps {
  children: ReactNode
  title: string
  description?: string
  popoverTitle?: string
  popoverItems?: Array<string>
}

export const StepLayout = ({
  children,
  title,
  popoverTitle,
  popoverItems,
  description,
}: StepLayoutProps) => {
  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6} align="stretch">
        <Box
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <VStack align="start" gap={6} mb={6}>
            <Heading size="lg">{title}</Heading>
            {description && (
              <Text color="gray.600" fontSize="md">
                {description}
              </Text>
            )}
            {popoverTitle && popoverItems && (
              <PopoverRoot size="lg">
                <PopoverTrigger asChild>
                  <IconButton variant="subtle" p={4}>
                    <BsInfoCircle />
                    {popoverTitle}
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent minW={{ base: '100%' }}>
                  <PopoverArrow />
                  <PopoverBody>
                    <List.Root as="ol" spaceY={2}>
                      {popoverItems.map((item, index) => (
                        <List.Item key={index} fontSize="md">
                          {item}
                        </List.Item>
                      ))}
                    </List.Root>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            )}
          </VStack>
          {children}
        </Box>
      </VStack>
    </Container>
  )
}

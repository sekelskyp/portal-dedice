import { Button, Icon, Text } from '@chakra-ui/react'
import { FiAlertCircle } from 'react-icons/fi'

import { Box } from '@frontend/shared/design-system'

interface ErrorTreePageProps {
  onGoBack: (questionIndex: number) => void
  questionIndex: number
}

export function ErrorTreePage({ onGoBack, questionIndex }: ErrorTreePageProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={{ base: 'xs', sm: 'container.sm' }}
    >
      <Box textAlign="center">
        <Icon
          boxSize={{ base: '48px', sm: '64px', md: '72px' }}
          color="red.500"
        >
          <FiAlertCircle />
        </Icon>
        <Text
          fontSize={{ sm: 'xl', md: '2xl', lg: '3xl' }}
          fontWeight="bold"
          mb={16}
          mx={{ base: 8, sm: 0 }}
        >
          Omlouváme se, ale tuto variantu nejsme schopni zpracovat.
        </Text>
        <Box mt={18} display="flex" gap={2} justifyContent="center">
          <Button onClick={() => onGoBack(questionIndex)}>
            Zpět na předchozí otázku
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

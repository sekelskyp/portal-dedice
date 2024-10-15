import { Box, Circle, Progress, Text } from '@chakra-ui/react'

interface StepperProgressProps {
  step: number
  questionsProgress: number
  treeProgress: number
}

export function StepperProgress({
  step,
  questionsProgress,
  treeProgress,
}: StepperProgressProps) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="4"
      >
        <Box textAlign="center">
          <Circle
            size="30px"
            bg={step > 1 ? 'blue.500' : 'gray.300'}
            color="white"
          >
            1
          </Circle>
          <Text mt="2" fontSize="sm" textAlign="center">
            Identifikace zůstavitele
          </Text>
        </Box>
        <Box flex="1" mx="4">
          <Progress value={questionsProgress} size="xs" colorScheme="blue" />
        </Box>
        <Box textAlign="center">
          <Circle
            size="30px"
            bg={step > 2 ? 'blue.500' : 'gray.300'}
            color="white"
          >
            2
          </Circle>
          <Text mt="2" fontSize="sm">
            Vyhledání notáře
          </Text>
        </Box>
        <Box flex="1" mx="4">
          <Progress value={treeProgress} size="xs" colorScheme="blue" />
        </Box>
        <Box textAlign="center">
          <Circle
            size="30px"
            bg={step > 3 ? 'blue.500' : 'gray.300'}
            color="white"
          >
            3
          </Circle>
          <Text mt="2" fontSize="sm">
            Průvodce řízením
          </Text>
        </Box>
      </Box>
    </>
  )
}

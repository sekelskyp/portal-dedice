import React, { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Stack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react'

import questionData from '../questionarrie.json'

interface Answer {
  id: number
  option_text: string
  option_value: string
}

interface Dependency {
  questionId: number
  answerId: number
}

interface Step {
  id: number
  question_text: string
  answer_options?: Answer[]
  dependencies?: Dependency[]
}

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode
}

const RadioCard = (props: RadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg={'gray.50'}
        _checked={{
          bg: 'blue.500',
          color: 'white',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const QuestionnaireStep = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const currentStep = questionData.steps[currentStepIndex]

  const handleAnswer = (nextValue: string) => {
    const answerId = parseInt(nextValue, 10)
    const answerOption = currentStep.answer_options?.find(
      (option) => option.id === answerId
    )
    if (answerOption) {
      setSelectedAnswer(answerId)
      setAnswers({
        ...answers,
        [currentStep.id]: answerId,
      })
    }
  }

  const findNextStepIndex = (startIndex: number): number => {
    for (let i = startIndex; i < questionData.steps.length; i++) {
      if (canShowStep(questionData.steps[i])) {
        return i
      }
    }
    return startIndex
  }

  const goToNextStep = () => {
    let nextStepIndex = currentStepIndex + 1
    while (
      nextStepIndex < questionData.steps.length &&
      !canShowStep(questionData.steps[nextStepIndex])
    ) {
      nextStepIndex++
    }
    if (nextStepIndex < questionData.steps.length) {
      setCurrentStepIndex(nextStepIndex)
      setSelectedAnswer(null)
    }
  }

  const goToPreviousStep = () => {
    let previousStepIndex = currentStepIndex - 1
    while (
      previousStepIndex >= 0 &&
      !canShowStep(questionData.steps[previousStepIndex])
    ) {
      previousStepIndex--
    }
    if (previousStepIndex >= 0) {
      setCurrentStepIndex(previousStepIndex)
      setSelectedAnswer(
        answers[questionData.steps[previousStepIndex].id] || null
      )
    }
  }

  const goToFirstStep = () => {
    const firstStepIndex = findNextStepIndex(0)
    setCurrentStepIndex(firstStepIndex)
  }

  const canShowStep = (step: Step): boolean => {
    if (!step.dependencies) return true

    return step.dependencies.every((dependency) => {
      const dependentResponse = answers[dependency.questionId]
      return dependentResponse === dependency.answerId
    })
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: selectedAnswer !== null ? selectedAnswer.toString() : '',
    onChange: (value) => handleAnswer(value),
  })

  const group = getRootProps()

  return (
    <Box>
      {canShowStep(currentStep) ? (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {currentStep.question_text}
          </Heading>
          <Box>
            <Stack {...group} direction="column" alignItems="center">
              {currentStep.answer_options?.map((answer) => {
                const radio = getRadioProps({ value: answer.id.toString() })
                return (
                  <RadioCard key={answer.id} {...radio}>
                    <Box width={{ base: 'sm', lg: 'lg' }} textAlign="center">
                      {answer.option_text}
                    </Box>
                  </RadioCard>
                )
              })}
            </Stack>
          </Box>
          <Box mt={4}>
            {currentStepIndex > 0 && (
              <Button
                bg="gray.500"
                order={{ base: 2, sm: 1 }}
                fontSize={{ base: 'sm', sm: 'md' }}
                onClick={goToPreviousStep}
                mr={2}
              >
                Zpět
              </Button>
            )}
            {currentStepIndex < questionData.steps.length - 1 && (
              <Button
                order={{ base: 1, sm: 2 }}
                fontSize={{ base: 'sm', sm: 'md' }}
                onClick={goToNextStep}
                isDisabled={selectedAnswer === null}
              >
                Pokračuj
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          <Button onClick={goToFirstStep}>Skip to next question</Button>
        </Box>
      )}
    </Box>
  )
}

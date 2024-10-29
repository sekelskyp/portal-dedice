import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react'

import { ErrorTreePage } from '../pages/ErrorTreePage'
import questionData from '../questionnaire.json'

interface Answer {
  id: number
  option_text: string
}

interface Dependency {
  questionId: number
  answerId?: number
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
    <Box as="label" justifyContent={'center'}>
      <input {...input} style={{ display: 'none' }} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        bg={'gray.50'}
        _checked={{
          bg: 'blue.500',
          color: 'white',
        }}
        px={{ base: 3, sm: 5 }}
        py={{ base: 2, sm: 3 }}
        width={{ base: '100%', sm: '50%' }}
        mx={'auto'}
      >
        {props.children}
      </Box>
    </Box>
  )
}

interface QuestionnaireStepProps {
  setPreviousStep: () => void
}

export const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  setPreviousStep,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showError, setShowError] = useState(false)

  const currentStep = questionData.steps[currentStepIndex]

  const canShowStep = (step: Step): boolean => {
    if (!step.dependencies) return true
    return step.dependencies.every((dependency) => {
      const dependentAnswer = answers[dependency.questionId]
      return dependentAnswer === dependency.answerId
    })
  }

  const findNextStepIndex = (startIndex: number): number => {
    for (let i = startIndex; i < questionData.steps.length; i++) {
      if (canShowStep(questionData.steps[i])) {
        return i
      }
    }
    return startIndex
  }

  const handleAnswer = (nextValue: string) => {
    const answerId = parseInt(nextValue, 10)

    // Only update selectedAnswer if the new value is different
    if (selectedAnswer !== answerId) {
      setSelectedAnswer(answerId)
    }

    // Update answers only if the new answer differs from the current one
    if (answers[currentStep.id] !== answerId) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentStep.id]: answerId,
      }))
    }
  }

  const goToNextStep = () => {
    if (
      selectedAnswer !== null ||
      (currentStep.answer_options?.length ?? 0) === 1
    ) {
      if (currentStep.id === 3 && selectedAnswer === 1) {
        setShowError(true)
      } else {
        const nextStepIndex = findNextStepIndex(currentStepIndex + 1)
        if (currentStep.answer_options?.length === 1) {
          const singleAnswerId = currentStep.answer_options[0].id
          setSelectedAnswer(singleAnswerId)
          setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentStep.id]: singleAnswerId,
          }))
        }

        if (nextStepIndex !== -1) {
          setCurrentStepIndex(nextStepIndex)
          setSelectedAnswer(null)
        }
      }
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
      setSelectedAnswer(answers[questionData.steps[previousStepIndex].id])
    }
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: selectedAnswer !== null ? selectedAnswer.toString() : '',
    onChange: (value) => handleAnswer(value),
  })

  const group = getRootProps()

  if (showError) {
    return (
      <ErrorTreePage
        onGoBack={(questionIndex) => {
          setShowError(false)
          setCurrentStepIndex(questionIndex)
          setSelectedAnswer(null)
        }}
        questionIndex={currentStepIndex - 1}
      />
    )
  }

  return (
    <Box>
      {canShowStep(currentStep) ? (
        <Box pt={4} my={16} mx={24}>
          <Container>
            <Heading as="h2" size={{ base: 'sm', sm: 'md' }} mb={4}>
              {currentStep.question_text}
            </Heading>
          </Container>
          {(currentStep.answer_options?.length ?? 0) > 1 && (
            <Stack {...group} direction="column" justifyItems={'center'}>
              {currentStep.answer_options?.map((answer) => {
                const radio = getRadioProps({ value: answer.id.toString() })
                return (
                  <RadioCard key={answer.id} {...radio}>
                    {answer.option_text}
                  </RadioCard>
                )
              })}
            </Stack>
          )}
          <Box my={8} justifyContent={'space-between'}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              pt={4}
              mt={16}
              justifyContent="space-between"
            >
              {currentStep?.id === 1 && (
                <Button
                  onClick={setPreviousStep}
                  bg="gray.500"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  size={{ base: 'sm', sm: 'lg' }}
                >
                  Zpět na otázky
                </Button>
              )}
              {currentStepIndex > 0 && (
                <Button
                  bg="gray.500"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  size={{ base: 'sm', sm: 'lg' }}
                  onClick={goToPreviousStep}
                >
                  Zpět
                </Button>
              )}
              <Button
                fontSize={{ base: 'sm', sm: 'md' }}
                size={{ base: 'sm', sm: 'lg' }}
                onClick={goToNextStep}
                isDisabled={
                  (currentStep.answer_options?.length ?? 0) > 1 &&
                  selectedAnswer === null
                }
              >
                Pokračuj
              </Button>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box>
          <Button onClick={() => setCurrentStepIndex(findNextStepIndex(0))}>
            Skip to next question
          </Button>
        </Box>
      )}
    </Box>
  )
}

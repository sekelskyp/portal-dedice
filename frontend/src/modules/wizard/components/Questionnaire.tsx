import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'

import { ErrorTreePage } from '../pages/ErrorTreePage'
import questionData from '../questionnaire.json'

interface Answer {
  id: number
  option_text: string
  is_Error?: boolean
  is_End?: boolean
}

interface Dependency {
  questionId: number
  answerId?: number
}

interface Question {
  questionTextId: number
  questionText: string
}

interface Step {
  id: number
  question_text: Question[]
  button_text: string
  answer_options?: Answer[]
  dependencies?: Dependency[]
}

interface QuestionnaireStepProps {
  updateQuestionnaireProgress: (progressIncrement: number) => void
  decrementQuestionnaireProgress: (progressDecrement: number) => void
  setStep: (step: number) => void
  setCurrentQuestionHeading: (heading: string) => void
}

export const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  updateQuestionnaireProgress,
  decrementQuestionnaireProgress,
  setStep,
  setCurrentQuestionHeading,
}) => {
  const totalQuestionnaireSteps = questionData.steps.length

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showError, setShowError] = useState(false)

  const currentStep = questionData.steps[currentStepIndex]

  const canShowStep = (step: Step): boolean => {
    if (!step.dependencies || step.dependencies.length === 0) return true
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
    return -1
  }

  const handleAnswer = (answerId: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentStep.id]: answerId,
    }))
    setSelectedAnswer(answerId)
  }

  const goToNextStep = () => {
    if (selectedAnswer !== null || currentStep.answer_options?.length === 1) {
      const selectedAnswerObj = currentStep.answer_options?.find(
        (answer) => answer.id === selectedAnswer
      )
      if (
        selectedAnswerObj &&
        'is_Error' in selectedAnswerObj &&
        selectedAnswerObj.is_Error
      ) {
        setShowError(true)
        setSelectedAnswer(null)
        return
      }
      if (
        selectedAnswerObj &&
        'is_End' in selectedAnswerObj &&
        selectedAnswerObj.is_End
      ) {
        setStep(4)
        return
      }

      const nextStepIndex = findNextStepIndex(currentStepIndex + 1)

      setAnswers((prevAnswers) => {
        const updatedAnswers = { ...prevAnswers }
        const stepIds = questionData.steps.map((step) => step.id)
        const currentIndex = stepIds.indexOf(currentStep.id)
        stepIds
          .slice(currentIndex + 1)
          .forEach((id) => delete updatedAnswers[id])
        return updatedAnswers
      })

      if (nextStepIndex !== -1) {
        setCurrentStepIndex(nextStepIndex)
        updateQuestionnaireProgress(100 / totalQuestionnaireSteps)
        setSelectedAnswer(null)
      }
    }
  }

  useEffect(() => {
    if (currentStep.answer_options?.length === 1 && !answers[currentStep.id]) {
      handleAnswer(currentStep.answer_options[0].id)
      goToNextStep()
    }
  })

  useEffect(() => {
    setCurrentQuestionHeading(currentStep.question_heading)
  }, [currentStep, setCurrentQuestionHeading])

  const goToPreviousStep = () => {
    let previousStepIndex = currentStepIndex - 1
    if (previousStepIndex < 0) {
      previousStepIndex--
      setAnswers({})
    }
    while (
      previousStepIndex >= 0 &&
      !canShowStep(questionData.steps[previousStepIndex])
    ) {
      previousStepIndex--
    }
    setCurrentStepIndex(previousStepIndex)
    decrementQuestionnaireProgress(100 / totalQuestionnaireSteps)
    setSelectedAnswer(answers[questionData.steps[previousStepIndex].id])
  }

  if (showError) {
    return (
      <ErrorTreePage
        onGoBack={(questionIndex) => {
          setShowError(false)
          setCurrentStepIndex(questionIndex)
          setSelectedAnswer(null)
        }}
        questionIndex={currentStepIndex}
      />
    )
  }

  return (
    <Box my={8}>
      {canShowStep(currentStep) && (
        <Box>
          <Container
            alignContent={'block'}
            maxWidth={{ base: '95%', lg: '60%' }}
            bg="bg.panel"
            borderRadius="xl"
            px={8}
            my={8}
          >
            {currentStep.question_text.map((textObj) => (
              <Heading
                key={textObj.questionTextId}
                as="h2"
                size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                py={4}
              >
                {textObj.questionText}
              </Heading>
            ))}

            {(currentStep.answer_options?.length ?? 0) > 1 && (
              <Stack direction="column" justifyItems={'center'} pb={4}>
                {currentStep.answer_options?.map((answer) => (
                  <Button
                    key={answer.id}
                    onClick={() => handleAnswer(answer.id)}
                    variant={selectedAnswer === answer.id ? 'solid' : 'outline'}
                    size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                    whiteSpace="normal"
                    wordBreak="break-word"
                    py={answer.option_text.includes(' ') ? 6 : 4}
                  >
                    {answer.option_text}
                  </Button>
                ))}
              </Stack>
            )}
          </Container>
          <Container my={8} justifyContent={'space-between'}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              pt={4}
              mt={16}
              justifyContent="space-between"
            >
              <Button
                bg="gray.500"
                fontSize={{ base: 'sm', sm: 'md' }}
                size={{ base: 'sm', sm: 'lg' }}
                onClick={goToPreviousStep}
              >
                Zpět
              </Button>
              <Button
                fontSize={{ base: 'sm', sm: 'md' }}
                size={{ base: 'sm', sm: 'lg' }}
                onClick={goToNextStep}
                disabled={
                  (currentStep.answer_options?.length ?? 0) > 1 &&
                  selectedAnswer === null
                }
              >
                {currentStep.button_text}
              </Button>
            </Stack>
          </Container>
        </Box>
      )}
    </Box>
  )
}

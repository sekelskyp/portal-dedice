import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'

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
    if (!step.dependencies || step.dependencies.length === 0) return true
    console.log('Checking dependencies for step:', step.id)
    console.log('Current answers:', answers)
    return step.dependencies.every((dependency) => {
      const dependentAnswer = answers[dependency.questionId]
      console.log(
        `Dependency - Question ID: ${dependency.questionId}, Answer ID: ${dependency.answerId}, Selected Answer: ${dependentAnswer}`
      )
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
    if (currentStep.id === 3 && selectedAnswer === 1) {
      setShowError(true)
      return
    }

    if (selectedAnswer !== null || currentStep.answer_options?.length === 1) {
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

  const goToFirstQuestion = () => {
    setCurrentStepIndex(0)
    setSelectedAnswer(null)
    setAnswers({})
  }

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
            <Stack direction="column" justifyItems={'center'}>
              {currentStep.answer_options?.map((answer) => (
                <Button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  variant={selectedAnswer === answer.id ? 'solid' : 'outline'}
                >
                  {answer.option_text}
                </Button>
              ))}
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
                disabled={
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
          <Button onClick={goToFirstQuestion}>Skip to next question</Button>
        </Box>
      )}
    </Box>
  )
}

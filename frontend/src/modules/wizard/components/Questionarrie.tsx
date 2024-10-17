import React, { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

import questionData from '../questionarrie.json'

interface Answer {
  id: number
  option_text: string
  option_value: string
}

interface Dependency {
  questionId: number
  answerId: number // The answer that triggers this question
}

interface Step {
  id: number
  question_text: string
  answer_options?: Answer[]
  dependencies?: Dependency[] // Optional dependencies
}

const QuestionnaireStep = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const currentStep = questionData.steps[currentStepIndex]

  const handleAnswer = (nextValue: string) => {
    const answerId = parseInt(nextValue, 10)
    setSelectedAnswer(answerId)
    setAnswers({
      ...answers,
      [currentStep.id]: answerId,
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
      setSelectedAnswer(null) // Reset selected answer for the next step
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
      ) // Restore selected answer for the previous step
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

  return (
    <Box>
      {canShowStep(currentStep) ? (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {currentStep.question_text}
          </Heading>
          <RadioGroup
            onChange={(value) => handleAnswer(value)}
            value={selectedAnswer !== null ? selectedAnswer.toString() : ''}
          >
            <Stack direction="column">
              {currentStep.answer_options?.map((answer) => (
                <Radio key={answer.id} value={answer.id.toString()}>
                  {answer.option_text}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Box>
            {currentStepIndex > 0 && (
              <Button onClick={goToPreviousStep}>Previous</Button>
            )}
            {currentStepIndex < questionData.steps.length - 1 && (
              <Button
                onClick={goToNextStep}
                isDisabled={selectedAnswer === null}
              >
                Next
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

export default QuestionnaireStep

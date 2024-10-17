import React, { useState } from 'react'
import { Button, Heading } from '@chakra-ui/react'

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

  const currentStep = questionData.steps[currentStepIndex]

  const handleAnswer = (answerId: number) => {
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

  const findPreviousStepIndex = (startIndex: number): number => {
    for (let i = startIndex; i >= 0; i--) {
      if (canShowStep(questionData.steps[i])) {
        return i
      }
    }
    return startIndex
  }

  const goToNextStep = () => {
    const nextStepIndex = findNextStepIndex(currentStepIndex + 1)
    if (nextStepIndex < questionData.steps.length) {
      setCurrentStepIndex(nextStepIndex)
    }
  }

  const goToPreviousStep = () => {
    const prevStepIndex = findPreviousStepIndex(currentStepIndex - 1)
    if (prevStepIndex >= 0) {
      setCurrentStepIndex(prevStepIndex)
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
    <div>
      {canShowStep(currentStep) ? (
        <div>
          {/* Render the current question */}
          <Heading>{currentStep.question_text}</Heading>

          {currentStep.answer_options?.map((answer) => (
            <div key={answer.id}>
              <input
                type="radio"
                name={`question-${currentStep.id}`}
                value={answer.id}
                checked={answers[currentStep.id] === answer.id}
                onChange={() => handleAnswer(answer.id)} // Corrected to pass the answer.id
              />
              <label>{answer.option_text}</label>
            </div>
          ))}

          <div>
            {currentStepIndex > 0 && (
              <Button onClick={goToPreviousStep}>Previous</Button>
            )}
            {currentStepIndex < questionData.steps.length - 1 && (
              <Button onClick={goToNextStep}>Next</Button>
            )}
          </div>
        </div>
      ) : (
        // If the step can't be shown due to dependencies, skip to the next step
        <div>
          <Button onClick={goToFirstStep}>Skip to next question</Button>
        </div>
      )}
    </div>
  )
}

export default QuestionnaireStep

import { useState } from 'react'

export function useWizardSteps(
  totalQuestions: number,
  totalQuestionnaireSteps: number
) {
  const [
    { step, questionsProgress, questionId, questionnaireProgress },
    setState,
  ] = useState<{
    step: number
    questionsProgress: number
    questionId: number
    questionnaireProgress: number
  }>(INITIAL_STATE)

  const questionProgressIncrement = 100 / totalQuestions
  const questionnaireProgressIncrement = 100 / totalQuestionnaireSteps

  const setNextStep = () => {
    setState((prevState) => {
      if (prevState.step === 1) {
        return { ...prevState, step: 2 }
      }
      if (prevState.step === 2) {
        if (prevState.questionsProgress < 100) {
          const newQuestionsProgress =
            prevState.questionsProgress + questionProgressIncrement
          const newQuestionId = prevState.questionId + 1
          return {
            ...prevState,
            questionsProgress: newQuestionsProgress,
            questionId: newQuestionId,
            step: newQuestionsProgress >= 100 ? 3 : 2,
          }
        }
      }
      if (prevState.step === 3) {
        const newQuestionnaireProgress =
          prevState.questionnaireProgress + questionnaireProgressIncrement
        return {
          ...prevState,
          questionnaireProgress: Math.min(newQuestionnaireProgress, 100),
          step: newQuestionnaireProgress >= 100 ? 4 : 3,
        }
      }
      return prevState
    })
  }

  const setPreviousStep = () => {
    setState((prevState) => {
      if (prevState.step === 2) {
        if (prevState.questionsProgress > 0) {
          const newQuestionsProgress =
            prevState.questionsProgress - questionProgressIncrement
          const newQuestionId = Math.max(prevState.questionId - 1, 0)
          return {
            ...prevState,
            questionsProgress: Math.max(newQuestionsProgress, 0),
            questionId: newQuestionId,
          }
        }
        return { ...prevState, step: 1 }
      }
      if (prevState.step === 3) {
        if (prevState.questionnaireProgress > 0) {
          const newQuestionnaireProgress =
            prevState.questionnaireProgress - questionnaireProgressIncrement
          return {
            ...prevState,
            questionnaireProgress: Math.max(newQuestionnaireProgress, 0),
          }
        }
        return {
          ...prevState,
          step: 2,
          questionsProgress: Math.max(
            prevState.questionsProgress - questionProgressIncrement,
            0
          ),
          questionId: Math.max(prevState.questionId - 1, 0),
        }
      }
      if (prevState.step === 4) {
        const newQuestionnaireProgress =
          prevState.questionnaireProgress - questionnaireProgressIncrement
        return {
          ...prevState,
          questionnaireProgress: Math.max(newQuestionnaireProgress, 0),
          step: 3,
        }
      }
      return prevState
    })
  }

  return {
    step,
    questionsProgress,
    questionId,
    questionnaireProgress, // Export as questionnaireProgress
    setNextStep,
    setPreviousStep,
  }
}

const INITIAL_STATE = {
  step: 1,
  questionsProgress: 0,
  questionId: 0,
  questionnaireProgress: 0, // Updated to match renaming
} as const

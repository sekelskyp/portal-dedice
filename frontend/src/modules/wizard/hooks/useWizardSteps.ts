import { useState } from 'react'

interface WizardState {
  step: number
  questionsProgress: number
  questionId: number
  treeProgress: number
}

export function useWizardSteps(totalQuestions: number) {
  const [{ step, questionsProgress, questionId, treeProgress }, setState] =
    useState<WizardState>({
      step: 1,
      questionsProgress: 0,
      questionId: 0,
      treeProgress: 0,
    })

  const questionProgressIncrement = 100 / totalQuestions

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
        if (prevState.treeProgress < 100) {
          const newTreeProgress =
            prevState.treeProgress + questionProgressIncrement
          return {
            ...prevState,
            treeProgress: newTreeProgress,
            step: newTreeProgress >= 100 ? 4 : 3,
          }
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
        if (prevState.treeProgress > 0) {
          const newTreeProgress =
            prevState.treeProgress - questionProgressIncrement
          return {
            ...prevState,
            treeProgress: Math.max(newTreeProgress, 0),
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
        const newTreeProgress =
          prevState.treeProgress - questionProgressIncrement
        return {
          ...prevState,
          treeProgress: Math.max(newTreeProgress, 0),
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
    treeProgress,
    setNextStep,
    setPreviousStep,
  }
}

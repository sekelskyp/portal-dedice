import { useState } from 'react'

const STEPS = {
  IDENTIFICATION: 1,
  QUESTIONS: 2,
  QUESTIONNAIRE: 3,
  COMPLETE: 4,
} as const

const PROGRESS = {
  MIN: 0,
  MAX: 100,
} as const

const MIN_ID = 0

const calculateProgressIncrement = (total: number) => PROGRESS.MAX / total

export function useWizardSteps(
  totalQuestions: number,
  totalQuestionnaireSteps: number
) {
  const [state, setState] = useState<{
    step: number
    questionsProgress: number
    questionId: number
    questionnaireProgress: number
  }>(INITIAL_STATE)

  const questionProgressIncrement = calculateProgressIncrement(totalQuestions)
  const questionnaireProgressIncrement = calculateProgressIncrement(
    totalQuestionnaireSteps
  )

  const setNextStep = () => {
    setState((prevState) => {
      switch (prevState.step) {
        case STEPS.IDENTIFICATION:
          return { ...prevState, step: STEPS.QUESTIONS }
        case STEPS.QUESTIONS:
          if (prevState.questionsProgress < PROGRESS.MAX) {
            const newQuestionsProgress =
              prevState.questionsProgress + questionProgressIncrement
            const newQuestionId = prevState.questionId + 1
            return {
              ...prevState,
              questionsProgress: newQuestionsProgress,
              questionId: newQuestionId,
              step:
                newQuestionsProgress >= PROGRESS.MAX
                  ? STEPS.QUESTIONNAIRE
                  : STEPS.QUESTIONS,
            }
          }
          break
        case STEPS.QUESTIONNAIRE:
          const newQuestionnaireProgress =
            prevState.questionnaireProgress + questionnaireProgressIncrement
          return {
            ...prevState,
            questionnaireProgress: Math.min(
              newQuestionnaireProgress,
              PROGRESS.MAX
            ),
            step:
              newQuestionnaireProgress >= PROGRESS.MAX
                ? STEPS.COMPLETE
                : STEPS.QUESTIONNAIRE,
          }
      }
      return prevState
    })
  }

  const setPreviousStep = () => {
    setState((prevState) => {
      switch (prevState.step) {
        case STEPS.QUESTIONS:
          if (prevState.questionsProgress > PROGRESS.MIN) {
            const newQuestionsProgress =
              prevState.questionsProgress - questionProgressIncrement
            const newQuestionId = Math.max(prevState.questionId - 1, MIN_ID)
            return {
              ...prevState,
              questionsProgress: Math.max(newQuestionsProgress, PROGRESS.MIN),
              questionId: newQuestionId,
            }
          }
          return { ...prevState, step: STEPS.IDENTIFICATION }
        case STEPS.QUESTIONNAIRE:
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
            step: STEPS.QUESTIONS,
            questionsProgress: Math.max(
              prevState.questionsProgress - questionProgressIncrement,
              0
            ),
            questionId: Math.max(prevState.questionId - 1, 0),
          }
        case STEPS.COMPLETE:
          const newQuestionnaireProgress =
            prevState.questionnaireProgress - questionnaireProgressIncrement
          return {
            ...prevState,
            questionnaireProgress: Math.max(newQuestionnaireProgress, 0),
            step: STEPS.QUESTIONNAIRE,
          }
      }
      return prevState
    })
  }

  const setStep = (newStep: number) => {
    setState((prevState) => {
      let newQuestionsProgress = prevState.questionsProgress
      let newQuestionnaireProgress = prevState.questionnaireProgress

      if (newStep >= STEPS.COMPLETE) {
        newQuestionsProgress = PROGRESS.MAX
        newQuestionnaireProgress = PROGRESS.MAX
      }

      return {
        ...prevState,
        step: newStep,
        questionsProgress: newQuestionsProgress,
        questionnaireProgress: newQuestionnaireProgress,
      }
    })
  }

  const resetProgress = () => {
    setState((prevState) => ({
      ...prevState,
      questionnaireProgress: 0,
    }))
  }

  return {
    step: state.step,
    questionsProgress: state.questionsProgress,
    questionId: state.questionId,
    questionnaireProgress: state.questionnaireProgress,
    setNextStep,
    setPreviousStep,
    setStep,
    resetProgress,
  }
}

const INITIAL_STATE = {
  step: STEPS.IDENTIFICATION,
  questionsProgress: PROGRESS.MIN,
  questionId: MIN_ID,
  questionnaireProgress: PROGRESS.MIN,
} as const

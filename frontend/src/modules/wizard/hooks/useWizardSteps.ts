import { useState } from 'react'

export function useWizardSteps() {
  const [{ step, questionsProgress, treeProgress }, setState] = useState<{
    step: number
    questionsProgress: number
    treeProgress: number
  }>(INITIAL_STATE)
  const setNextStep = () => {
    if (step === 1) {
      setState((prevState) => ({ ...prevState, step: 2 }))
    } else if (step === 2) {
      if (questionsProgress < 100) {
        setState((prevState) => ({
          ...prevState,
          questionsProgress: questionsProgress + 10,
        }))
        if (questionsProgress + 10 >= 100) {
          setState((prevState) => ({ ...prevState, step: 3 }))
        }
      }
    } else if (step === 3) {
      if (treeProgress < 100) {
        setState((prevState) => ({
          ...prevState,
          treeProgress: treeProgress + 10,
        }))
        if (treeProgress + 10 >= 100) {
          setState((prevState) => ({ ...prevState, step: 4 }))
        }
      }
    }
  }

  const setPreviousStep = () => {
    if (step === 2) {
      if (questionsProgress > 0) {
        setState((prevState) => ({
          ...prevState,
          questionsProgress: questionsProgress - 10,
        }))
      } else {
        setState((prevState) => ({ ...prevState, step: 1 }))
      }
    } else if (step === 3) {
      if (treeProgress > 0) {
        setState((prevState) => ({
          ...prevState,
          treeProgress: treeProgress - 10,
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          step: 2,
          questionsProgress: questionsProgress - 10,
        }))
      }
    } else if (step === 4) {
      setState((prevState) => ({
        ...prevState,
        treeProgress: treeProgress - 10,
        step: 3,
      }))
    }
  }

  return {
    step,
    questionsProgress,
    treeProgress,
    setNextStep,
    setPreviousStep,
  }
}

const INITIAL_STATE = {
  step: 1,
  questionsProgress: 0,
  treeProgress: 0,
} as const

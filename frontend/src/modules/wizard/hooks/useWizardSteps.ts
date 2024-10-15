import { useState } from 'react'

export function useWizardSteps() {
  const [step, setStep] = useState(1)
  const [questionsProgress, setQuestionsProgress] = useState(0)
  const [treeProgress, setTreeProgress] = useState(0)

  const nextStep = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (questionsProgress < 100) {
        setQuestionsProgress(questionsProgress + 10)
        if (questionsProgress + 10 >= 100) {
          setStep(3)
        }
      }
    } else if (step === 3) {
      if (treeProgress < 100) {
        setTreeProgress(treeProgress + 10)
        if (treeProgress + 10 >= 100) {
          setStep(4)
        }
      }
    }
  }

  const previousStep = () => {
    if (step === 2) {
      if (questionsProgress > 0) {
        setQuestionsProgress(questionsProgress - 10)
      } else {
        setStep(1)
      }
    } else if (step === 3) {
      if (treeProgress > 0) {
        setTreeProgress(treeProgress - 10)
      } else {
        setStep(2)
        setQuestionsProgress(questionsProgress - 10)
      }
    } else if (step === 4) {
      setTreeProgress(treeProgress - 10)
      setStep(3)
    }
  }

  return {
    step,
    questionsProgress,
    treeProgress,
    nextStep,
    previousStep,
  }
}

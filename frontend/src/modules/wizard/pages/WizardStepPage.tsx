import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { Suggestion } from '@frontend/shared/hooks/useAddressSuggestions'

import { NotaryAssignment } from '../components/NotaryAssignment'
import { QuestionnaireStep } from '../components/Questionnaire'
import { QuestionStep } from '../components/QuestionStep'
import { StepperProgress } from '../components/stepper/StepperProgress'
import { TestatorIdentification } from '../components/TestatorIdentification'
import { WizardEnd } from '../components/WizardEnd'
import { useWizardSteps } from '../hooks/useWizardSteps'
import questionnaireData from '../questionnaire.json'
import questionData from '../questions.json'

type TestatorData = {
  sex?: string
  birthDate?: Date
  address?: Suggestion
}

interface TestatorDataContextProps {
  testatorData: TestatorData
  setTestatorData: Dispatch<SetStateAction<TestatorData>>
}

const defaultTestatorData: TestatorDataContextProps = {
  testatorData: {},
  setTestatorData: () => {},
}

export const TestatorDataContext =
  createContext<TestatorDataContextProps>(defaultTestatorData)

export function WizardPage() {
  const totalQuestions = questionData.length
  const totalQuestionnaireSteps = questionnaireData.steps.length
  const {
    step,
    questionsProgress,
    questionId,
    questionnaireProgress,
    setNextStep,
    setPreviousStep,
    setStep,
    resetProgress,
  } = useWizardSteps(totalQuestions, totalQuestionnaireSteps)

  const [testatorData, setTestatorData] = useState<TestatorData>({})
  const [currentQuestionHeading, setCurrentQuestionHeading] = useState('')

  function StepperHeading({ text }: { text: string }) {
    return (
      <Heading size={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }} pb={6}>
        {text}
      </Heading>
    )
  }

  return (
    <TestatorDataContext.Provider value={{ testatorData, setTestatorData }}>
      <Box width={{ base: '85%', md: '60%' }} mx="auto" mt="8">
        <StepperProgress
          step={step}
          questionsProgress={questionsProgress}
          questionnaireProgress={questionnaireProgress}
        />
        <Box textAlign="center" my="8">
          {step === 1 && (
            <Box>
              <StepperHeading text="Identifikace zůstavitele" />
              <TestatorIdentification nextStep={setNextStep} />
            </Box>
          )}
          {step === 2 && (
            <Box>
              <StepperHeading
                text={
                  questionsProgress === 0
                    ? 'Přiřazení notáře'
                    : `Průvodce pozůstalostním řízením (${
                        questionId
                      }/${totalQuestions})`
                }
              />
              {questionsProgress === 0 ? (
                <NotaryAssignment
                  nextStep={setNextStep}
                  previousStep={setPreviousStep}
                />
              ) : (
                <QuestionStep
                  progress={questionsProgress}
                  heading={questionData[questionId].heading}
                  questions={questionData[questionId].question}
                  button={questionData[questionId].button}
                  nextStep={setNextStep}
                  previousStep={setPreviousStep}
                  questionsProgress={questionsProgress}
                />
              )}
            </Box>
          )}
          {step === 3 && (
            <Box>
              <StepperHeading text={currentQuestionHeading} />
              <QuestionnaireStep
                updateQuestionnaireProgress={setNextStep}
                decrementQuestionnaireProgress={setPreviousStep}
                setStep={setStep}
                setCurrentQuestionHeading={setCurrentQuestionHeading}
              />
            </Box>
          )}
          {step === 4 && (
            <Box>
              <StepperHeading text="Výstup nachytřovadla" />
              <WizardEnd setStep={setStep} resetProgress={resetProgress} />
            </Box>
          )}
        </Box>
      </Box>
    </TestatorDataContext.Provider>
  )
}

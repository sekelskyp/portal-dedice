import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'

import { Page } from '@frontend/shared/layout'

import { NotaryAssignment } from '../components/notary-assignment/NotaryAssignment'
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
  addressInput?: {
    street?: string
    streetNumber?: string
    municipality?: string
    postalCode?: string
  }
}

interface TestatorDataContextProps {
  testatorData: TestatorData
  setTestatorData: Dispatch<SetStateAction<TestatorData>>
}

const defaultTestatorData: TestatorDataContextProps = {
  testatorData: {},
  setTestatorData: () => {},
}

// eslint-disable-next-line react-refresh/only-export-components
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
  const isNotaryAssignmentStep = questionsProgress === 0

  function StepperHeading({ text }: { text: string }) {
    return (
      <Heading size={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }} pb={6}>
        {text}
      </Heading>
    )
  }

  return (
    <TestatorDataContext.Provider value={{ testatorData, setTestatorData }}>
      <Page as={Stack} gap={8}>
        <StepperProgress
          step={step}
          questionsProgress={questionsProgress}
          questionnaireProgress={questionnaireProgress}
        />
        <Box textAlign="center">
          {(() => {
            switch (step) {
              case 1:
                return (
                  <Box>
                    <StepperHeading text="Identifikace zůstavitele" />
                    <TestatorIdentification nextStep={setNextStep} />
                  </Box>
                )
              case 2:
                return (
                  <Box>
                    <StepperHeading
                      text={
                        isNotaryAssignmentStep
                          ? 'Přiřazení notáře'
                          : `Průvodce pozůstalostním řízením (${
                              questionId
                            }/${totalQuestions})`
                      }
                    />
                    {isNotaryAssignmentStep ? (
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
                )
              case 3:
                return (
                  <Box>
                    <StepperHeading text={currentQuestionHeading} />
                    <QuestionnaireStep
                      updateQuestionnaireProgress={setNextStep}
                      decrementQuestionnaireProgress={setPreviousStep}
                      setStep={setStep}
                      setCurrentQuestionHeading={setCurrentQuestionHeading}
                    />
                  </Box>
                )
              case 4:
                return (
                  <Box>
                    <StepperHeading text="Výstup nachytřovadla" />
                    <WizardEnd
                      setStep={setStep}
                      resetProgress={resetProgress}
                    />
                  </Box>
                )
              default:
                return null
            }
          })()}
        </Box>
      </Page>
    </TestatorDataContext.Provider>
  )
}

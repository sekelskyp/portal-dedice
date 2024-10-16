import { Box, Button, Heading } from '@chakra-ui/react'

import { NotaryAssignment } from '../components/NotaryAssignment'
import { QuestionStep } from '../components/QuestionStep'
import { StepperProgress } from '../components/stepper/StepperProgress'
import { TestatorIdentification } from '../components/TestatorIdentification'
import { useWizardSteps } from '../hooks/useWizardSteps'
import questionData from '../questions.json'

export function WizardPage() {
  const {
    step,
    questionsProgress,
    treeProgress,
    setNextStep,
    setPreviousStep,
  } = useWizardSteps()

  const data = questionData

  return (
    <Box width="60%" mx="auto" mt="4">
      <StepperProgress
        step={step}
        questionsProgress={questionsProgress}
        treeProgress={treeProgress}
      />
      <Box textAlign="center" mb="8">
        {step === 1 && (
          <Box>
            <Heading as={'h3'} size="xl">
              Identifikace zůstavitele{' '}
            </Heading>
            <TestatorIdentification nextStep={setNextStep} />
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Heading as={'h3'} size="xl">
              {questionsProgress === 0
                ? 'Přiřazení notáře'
                : 'Průvodce pozůstalostním řízením'}
            </Heading>
            {questionsProgress === 0 ? (
              <NotaryAssignment />
            ) : (
              <QuestionStep
                progress={questionsProgress}
                heading={data[questionsProgress / 10].heading}
                questions={data[questionsProgress / 10].question}
              />
            )}
            <Box display="flex" justifyContent="space-between" mt="8" mb="8">
              <Button onClick={setPreviousStep}>Zpět</Button>
              <Button onClick={setNextStep}>
                {data[questionsProgress / 10].button}
              </Button>
            </Box>
          </Box>
        )}

        {step === 3 && (
          <Heading as={'h3'} size="xl">
            Rozhodovací strom...
          </Heading>
        )}
        {step === 4 && (
          <Heading as={'h3'} size="xl">
            Výstup nachytřovadla...
          </Heading>
        )}
      </Box>
    </Box>
  )
}

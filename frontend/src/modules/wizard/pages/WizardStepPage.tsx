import { Box, Button, Text } from '@chakra-ui/react'

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
            <Text fontSize="lg">Identifikace zůstavitele (Step 1)</Text>
            <TestatorIdentification nextStep={setNextStep} />
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Text fontSize="lg">Vyhledání notáře (Step 2)</Text>
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

        {step === 3 && <Text fontSize="lg">Průvodce řízením (Step 3)</Text>}
        {step === 4 && (
          <Text fontSize="lg">Konec, tady máte výsledek nachytřovadla.</Text>
        )}
      </Box>
    </Box>
  )
}

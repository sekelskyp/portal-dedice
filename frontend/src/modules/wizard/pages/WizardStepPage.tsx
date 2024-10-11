import { Container, Stack, useSteps } from '@chakra-ui/react'

import { Page } from '@frontend/shared/layout'

import { WizardStepOne } from '../components/WizardStepOne'
import { WizardStepper } from '../components/WizardStepper'
import { WizardStepTwo } from '../components/WizardStepTwo'
import { steps } from '../steps'

export function WizardPage() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Page>
      <Container maxW={'container.lg'} as={Stack} gap={12}>
        <WizardStepper activeStep={activeStep} steps={steps} />
        {activeStep === 0 && (
          <WizardStepOne
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 1 && <WizardStepTwo />}
      </Container>
    </Page>
  )
}

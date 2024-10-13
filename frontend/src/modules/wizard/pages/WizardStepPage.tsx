import { Container, Stack, useSteps } from '@chakra-ui/react'

import { Page } from '@frontend/shared/layout'

import { WizardStepEight } from '../atoms/WizardStepEight'
import { WizardStepEleven } from '../atoms/WizardStepEleven'
import { WizardStepFive } from '../atoms/WizardStepFive'
import { WizardStepFour } from '../atoms/WizardStepFour'
import { WizardStepNine } from '../atoms/WizardStepNine'
import { WizardStepOne } from '../atoms/WizardStepOne'
import { WizardStepper } from '../atoms/WizardStepper'
import { WizardStepSeven } from '../atoms/WizardStepSeven'
import { WizardStepSix } from '../atoms/WizardStepSix'
import { WizardStepTen } from '../atoms/WizardStepTen'
import { WizardStepThree } from '../atoms/WizardStepThree'
import { WizardStepTwelve } from '../atoms/WizardStepTwelve'
import { WizardStepTwo } from '../atoms/WizardStepTwo'
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
        {activeStep === 1 && (
          <WizardStepTwo
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 2 && (
          <WizardStepTwelve
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
      </Container>
    </Page>
  )
}

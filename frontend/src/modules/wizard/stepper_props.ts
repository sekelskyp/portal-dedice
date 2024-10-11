export type WizardStepProps = {
  activeStep: number
  setActiveStep: (step: number) => void
  steps?: { title: string; description: string }[]
}

import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  InputControl,
  SelectControl,
  SubmitButton,
} from 'react-hook-form-chakra'
import * as z from 'zod'

import { Page } from '@frontend/shared/layout'

const schema = z.object({
  sex: z.string().min(1, 'Pohlaví je povinné'),
  birthDate: z.string().min(1, 'Datum narození je povinné'),
  address: z.string().min(1, 'Adresa bydliště je povinná'),
})

const steps = [
  { title: 'První krok', description: 'Identifikace zůstavitele' },
  { title: 'Druhý krok', description: 'Vyhledání notáře' },
  { title: 'Třetí krok', description: 'Průvodce řízením' },
]

export function WizardPage() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = (data: z.infer<typeof schema>) => alert(JSON.stringify(data, null, 2))

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Page>
      <Container maxW={'container.lg'} as={Stack} gap={12}>
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <FormProvider {...methods}>
          <Flex
            direction={'column'}
            gap={5}
            as="form"
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
          >
            <Heading as={'h3'} size="lg">
              Identifikace zůstavitele
            </Heading>
            <Text fontSize="lg">
              Vyplněním formuláře Vám pomůžeme zjistit, který notář bude
              spravovat Vaše pozůstalostní řízení
            </Text>
            <SelectControl
              name="sex"
              label="Pohlaví"
              selectProps={{ placeholder: 'Zvolte pohlaví' }}
            >
              <option value="male">Muž</option>
              <option value="female">Žena</option>
            </SelectControl>
            <InputControl
              name="birthDate"
              label="Datum narození"
              inputProps={{ type: 'date' }}
              isRequired
            ></InputControl>
            <InputControl
              name="address"
              label="Trvalé bydliště"
              isRequired
            ></InputControl>
            <Spacer></Spacer>
            <SubmitButton>Kdo bude můj notář?</SubmitButton>
          </Flex>
        </FormProvider>
      </Container>
    </Page>
  )
}

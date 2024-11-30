import { useContext } from 'react'
import { Card, Center, Container, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import resources from '@frontend/resources'
import { Radio } from '@frontend/shared/design-system'
import {
  AddressGroupFormControl,
  DateFormControl,
  Form,
  RadioGroupFormControl,
  SubmitButton,
} from '@frontend/shared/forms'

import { TestatorDataContext } from '../pages/WizardStepPage'

const schema = z.object({
  sex: z.string().min(1, 'Pohlaví je povinné.'),
  birthDate: z
    .date({ required_error: 'Datum narození je povinné.' })
    .max(new Date(), 'Datum narození musí být v minulosti.'),
  addressInput: z.object({
    street: z.string().min(1, 'Ulice je povinná.'),
    streetNumber: z.string().min(1, 'Číslo popisné je povinné.'),
    municipality: z.string().min(1, 'Obec je povinná.'),
    postalCode: z.string().min(1, 'PSČ je povinné.'),
  }),
})

type NextStepProps = {
  nextStep: () => void
}

export function TestatorIdentification({ nextStep }: NextStepProps) {
  const testatorDataContext = useContext(TestatorDataContext)
  const { testatorData, setTestatorData } = testatorDataContext

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const updatedTestatorData = {
      ...testatorData,
      ...data,
    }
    setTestatorData(updatedTestatorData)
    nextStep()
  }

  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      noValidate
      defaultValues={{
        sex: testatorData.sex || '',
        birthDate: testatorData.birthDate || undefined!,
        addressInput: {
          street: testatorData.addressInput?.street || '',
          municipality: testatorData.addressInput?.municipality || '',
          postalCode: testatorData.addressInput?.postalCode || '',
          streetNumber: testatorData.addressInput?.streetNumber || '',
        },
      }}
    >
      <Container
        maxW="4xl"
        width="100%"
        px={{ base: 4, sm: 8, md: 12, lg: 16 }}
        py={{ base: 2, sm: 4 }}
      >
        <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
          {resources.wizard.testatorIdentification.title}
        </Text>
        <Card.Root mt={8}>
          <Card.Body as={Stack} gap={5}>
            <RadioGroupFormControl
              name="sex"
              label="Pohlaví"
              required
              size={{ base: 'sm', md: 'md' }}
            >
              <Radio value="Male">
                {resources.wizard.testatorIdentification.radio.male}
              </Radio>
              <Radio value="Female">
                {resources.wizard.testatorIdentification.radio.female}
              </Radio>
            </RadioGroupFormControl>
            <DateFormControl name="birthDate" label="Datum narození" required />
            <AddressGroupFormControl required label="Trvalé bydliště" />
            <Center>
              <SubmitButton>
                {resources.wizard.testatorIdentification.submit}
              </SubmitButton>
            </Center>
          </Card.Body>
        </Card.Root>
      </Container>
    </Form>
  )
}

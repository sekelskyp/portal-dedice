import { useContext } from 'react'
import { Card, Center, Container, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Radio } from '@frontend/shared/design-system'
import {
  DateFormControl,
  Form,
  RadioGroupFormControl,
  SubmitButton,
} from '@frontend/shared/forms'
import { ZipCodeFormControl } from '@frontend/shared/forms/ZipCodeFormControl'

import { TestatorDataContext } from '../pages/WizardStepPage'
import { getZipCodeFromAddress } from '../utils/getGeocode'

const schema = z.object({
  sex: z.string().min(1, 'Pohlaví je povinné.'),
  birthDate: z
    .date({ required_error: 'Datum narození je povinné.' })
    .max(new Date(), 'Datum narození musí být v minulosti.'),
  address: z.string().min(1, 'Adresa bydliště je povinná.'),
})

type NextStepProps = {
  nextStep: () => void
}

export function TestatorIdentification({ nextStep }: NextStepProps) {
  const testatorDataContext = useContext(TestatorDataContext)
  const { testatorData, setTestatorData } = testatorDataContext

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const postalCode = await getZipCodeFromAddress(data.address)
    const testatorData = { ...data, postalCode }
    setTestatorData(testatorData)
    nextStep()
  }

  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      noValidate
      values={{
        sex: testatorData.sex || '',
        birthDate: testatorData.birthDate || undefined!,
        address: testatorData.address || '',
      }}
      {...methods}
    >
      <Container
        maxW="2xl"
        width="100%"
        px={{ base: 4, sm: 8, md: 12, lg: 16 }}
        py={{ base: 2, sm: 4 }}
      >
        <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
          Vyplněním formuláře údaji zůstavitele Vám pomůžeme zjistit, který
          notář bude spravovat Vaše pozůstalostní řízení.
        </Text>
        <Card.Root mt={8}>
          <Card.Body as={Stack} gap={5}>
            <RadioGroupFormControl
              name="sex"
              label="Pohlaví"
              required
              size={{ base: 'sm', md: 'md' }}
            >
              <Radio value="male">Muž</Radio>
              <Radio value="female">Žena</Radio>
            </RadioGroupFormControl>
            <DateFormControl name="birthDate" label="Datum narození" required />
            <ZipCodeFormControl
              name="address"
              label="Trvalé bydliště"
              required
            />
            <Center>
              <SubmitButton>Potvrdit údaje</SubmitButton>
            </Center>
          </Card.Body>
        </Card.Root>
      </Container>
    </Form>
  )
}

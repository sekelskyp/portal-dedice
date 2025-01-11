import { useState } from 'react'
import {
  Box,
  Card,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  List,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { InfoIcon, PlusIcon } from 'lucide-react'

import {
  Alert,
  StatLabel,
  StatRoot,
  StatValueText,
  Tooltip,
} from '@frontend/shared/design-system'
import { Form, InputFormControl, SubmitButton } from '@frontend/shared/forms'

const numberFormat = Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
})

export const RewardCalculator = () => {
  const [value, setValue] = useState<number | undefined>()

  const { reward, VAT } = useRewardCalculator(value ?? 0)

  const totalReward = reward + VAT

  return (
    <Stack gap={8}>
      <Heading>Výpočet odměny notáře</Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 0, md: 12 }}
      >
        <Box w="full">
          <Form onSubmit={(value) => setValue(+value.worth)}>
            <Stack gap={6}>
              <InputFormControl
                inputProps={{
                  type: 'number',
                  step: 1000,
                  size: 'xl',
                }}
                placeholder="Hodnota majetku v pozůstalosti"
                label={
                  <Flex gap={2}>
                    <Text fontSize="lg">Hodnota majetku v pozůstalosti</Text>
                    <Tooltip
                      showArrow
                      content="Pro návod jak určit hodnotu doporučujeme informační sekci níže na stránce."
                    >
                      <Icon mb={0.5} size="md">
                        <InfoIcon />
                      </Icon>
                    </Tooltip>
                  </Flex>
                }
                name="worth"
              />
              <SubmitButton size="xl">Spočítat</SubmitButton>
            </Stack>
          </Form>
        </Box>
        {reward ? (
          <Card.Root w="full" bg={'bg.emphasized/75'}>
            <Card.Body>
              <Stack gap={6}>
                <StatRoot>
                  <StatLabel>Odměna notáře celkem</StatLabel>
                  <StatValueText>
                    {numberFormat.format(totalReward)}
                  </StatValueText>
                </StatRoot>
                <HStack alignItems="end" gap={3}>
                  <StatRoot flex="none" size="sm">
                    <StatLabel>Odměna notáře</StatLabel>
                    <StatValueText>{numberFormat.format(reward)}</StatValueText>
                  </StatRoot>
                  <Icon size="md" mb={2}>
                    <PlusIcon />
                  </Icon>
                  <StatRoot flex="none" size="sm">
                    <StatLabel>DPH</StatLabel>
                    <StatValueText>{numberFormat.format(VAT)}</StatValueText>
                  </StatRoot>
                </HStack>
                <Stack>
                  <Alert
                    bg="none"
                    p={0}
                    title="Výpočet je zaokrouhlen na celé koruny."
                  />
                  <Alert
                    bg="none"
                    p={0}
                    title="Tento výpočet je orientační, konečná částka se může lišit
                    v&nbsp;závislosti na dalších požadovaných či potřebných
                    úkonech."
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>
        ) : (
          <Stack mt={6} gap={4} w="full">
            <Alert
              h="min-content"
              icon={
                <Circle
                  w={7}
                  h={7}
                  bg="fg.info"
                  color="fg.inverted"
                  fontSize="md"
                >
                  1
                </Circle>
              }
            >
              Zadejte hodnotu majetku v pozůstalosti.
            </Alert>
            <Alert
              h="min-content"
              icon={
                <Circle
                  w={7}
                  h={7}
                  bg="fg.info"
                  color="fg.inverted"
                  fontSize="md"
                >
                  2
                </Circle>
              }
            >
              Stiskněte tlačítko "Spočítat".
            </Alert>
          </Stack>
        )}
      </Stack>
      <Separator />
      <Stack fontSize={'sm'} maxW="80ch">
        <Heading size="md">Jak určit hodnotu pozůstalosti</Heading>
        <List.Root as="ol" listStyle="upper-alpha" ml={6}>
          <List.Item>
            Hodnota pozůstalosti je součet všech aktiv, tedy plusových hodnot
            v&nbsp;pozůstalosti.
          </List.Item>
          <List.Item>Dluhy z hodnoty neodečítejte.</List.Item>
          <List.Item>
            V případě, že je součástí vypořádání dědictví také vypořádání SJM,
            tedy, pokud je součástí řízení pozůstalý manžel/manželka postupujte
            následovně:
            <List.Root as="ol" listStyle="decimal" ml={4}>
              <List.Item>sečtěte majetek v SJM,</List.Item>
              <List.Item>vydělte částku 2,</List.Item>
              <List.Item>
                v případě, že měl zůstavitel nějaký majetek v&nbsp;osobním
                vlastnictví (tedy majetek, který nespadá do SJM), tak ho
                k&nbsp;částce přičtěte,
              </List.Item>
              <List.Item>
                výslednou hodnotu zadejte do pole{' '}
                <em>Hodnota majetku v&nbsp;pozůstalosti</em>.
              </List.Item>
            </List.Root>
          </List.Item>
        </List.Root>
        <Text></Text>
      </Stack>

      <Separator />
      <Text fontSize={'sm'}>
        Výpočet odměny notáře odpovídá{' '}
        <Link href="https://www.zakonyprolidi.cz/cs/2001-196">
          Vyhlášce č.&nbsp;196/2001&nbsp;Sb., Notářský tarif
        </Link>
        &nbsp;v&nbsp;platném znění
      </Text>
    </Stack>
  )
}

const limits = [
  [0, 500000, 0.02],
  [500000, 1000000, 0.009],
  [1000000, 3000000, 0.005],
  [3000000, 30000000, 0.001],
  [30000000, 100000000, 0.0005],
]

const VATPercentage = 0.21

// Calculates the reward from given value according to the limits
const calculateReward = (value: number) => {
  let remainingValue = value
  // let processedValue = 0
  let reward = 0

  for (const [min, max, percentage] of limits) {
    const range = max - min
    const valueInThisRange = Math.min(remainingValue, range)
    const rewardInThisRange = valueInThisRange * percentage

    reward += rewardInThisRange
    // processedValue += valueInThisRange
    remainingValue -= valueInThisRange

    if (remainingValue <= 0) break
  }

  return Math.round(reward)
}

const useRewardCalculator = (value: number) => {
  const reward = calculateReward(value)

  return {
    reward,
    VAT: reward * VATPercentage,
  }
}

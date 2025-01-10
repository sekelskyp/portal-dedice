import { Fieldset, Stack } from '@chakra-ui/react'

import { monthNames } from '../../utils/monthUtils'
import {
  useGetNotaryAddressRules,
  useGetNotaryDateRules,
} from '../hooks/useGetNotaryRules'

import { AddressRuleTable } from './AddressRuleTable'
import { DateRulesTable } from './DateRulesTable'

export function NotaryRulesDisplay() {
  const { data: addressData } = useGetNotaryAddressRules()
  const { data: dateData } = useGetNotaryDateRules()

  const dateRules =
    dateData?.getNotaryDateRulesByNotary.flatMap((rule) => [
      {
        id: rule.id,
        label: 'Narození zůstavitele:',
        value:
          rule.startDay +
          '. ' +
          monthNames[rule.startMonth - 1] +
          ' až ' +
          rule.endDay +
          '. ' +
          monthNames[rule.endMonth - 1],
      },
    ]) || []

  return (
    <Fieldset.Root bg="gray.100" borderRadius="xl" p={4}>
      <Stack>
        <Fieldset.Legend>Notářská pravidla</Fieldset.Legend>
        <Fieldset.HelperText fontSize="xs">
          Zde lze vidět vaše notářská pravidla. Tyto pravidla jsou použita při
          přiřazení notáře pozůstalým na základě údajů zůstavitele (pravidla si
          nemůžete změnit).
        </Fieldset.HelperText>
      </Stack>
      <Fieldset.Content>
        <AddressRuleTable postalCode={addressData?.getNotaryById?.postalCode} />
        <DateRulesTable dateRules={dateRules} />
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

import { HStack, Stack } from '@chakra-ui/react'
import {
  AddressGroupFormControl,
  Form,
  InputFormControl,
  RadioGroupFormControl,
  SubmitButton,
  SwitchFormControl,
} from '@components/form'
import { Radio } from '@components/ui/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@src/modules/auth'
import { z } from 'zod'

import { NameGroupFormControl } from './NameGroupFormControl'
import { NotaryRulesDisplay } from './NotaryRulesDisplay'

// eslint-disable-next-line react-refresh/only-export-components
export const profileFormSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  displayName: z.string().min(1),
  phone: z.string().min(9).optional().nullish(),
  gender: z.string().optional().nullish(),
  sendNotifications: z.boolean().optional().nullish(),
  addressInput: z.object({
    street: z.string().optional().nullish(),
    streetNumber: z.string().optional().nullish(),
    municipality: z.string().optional().nullish(),
    postalCode: z.string().optional().nullish(),
  }),
})

export const ProfileForm = ({
  loading,
  defaultValues,
  onSubmit,
}: {
  loading: boolean
  defaultValues: z.infer<typeof profileFormSchema>
  onSubmit: (variables: z.infer<typeof profileFormSchema>) => void
}) => {
  const { user } = useAuth()
  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(profileFormSchema)}
      loading={loading}
      defaultValues={defaultValues}
      noValidate
    >
      <Stack gap={4}>
        <NameGroupFormControl />
        <HStack gap={4}>
          <InputFormControl name="phone" label="Telefon" />
        </HStack>
        <RadioGroupFormControl name="gender" label="Pohlaví">
          <Radio value="Male">Muž</Radio>
          <Radio value="Female">Žena</Radio>
        </RadioGroupFormControl>
        <AddressGroupFormControl label="Trvalé bydliště" />
        <SwitchFormControl
          name="sendNotifications"
          label="Emailové notifikace"
          helperText="Povolit odesílání emailových notifikací v rámci chatu."
        />
        {user?.type === 'Notary' && <NotaryRulesDisplay />}

        <SubmitButton alignSelf="end" px={8}>
          Uložit
        </SubmitButton>
      </Stack>
    </Form>
  )
}

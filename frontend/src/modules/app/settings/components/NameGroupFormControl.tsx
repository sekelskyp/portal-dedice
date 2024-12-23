import { HStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { ProfileInput } from '@frontend/gql/graphql'
import { InputFormControl } from '@frontend/shared/forms'

const calculateDisplayName = (name?: string, surname?: string) => {
  let displayName = ''
  if (name?.trim()) displayName += name

  if (surname?.trim()) displayName += ` ${surname}`

  return displayName
}

export const NameGroupFormControl = () => {
  const { getValues, setValue } = useFormContext<ProfileInput>()

  const displayNameUpdater = (name?: string, surname?: string) => {
    setValue('displayName', calculateDisplayName(name, surname), {
      shouldValidate: true,
    })
  }
  return (
    <>
      <HStack gap={4}>
        <InputFormControl
          name="name"
          label="Jméno"
          onChange={(changedName) => {
            displayNameUpdater(changedName, getValues('surname') ?? undefined)
          }}
        />
        <InputFormControl
          name="surname"
          label="Příjmení"
          onChange={(changedSurname) => {
            displayNameUpdater(getValues('name') ?? undefined, changedSurname)
          }}
        />
      </HStack>
      <InputFormControl
        name="displayName"
        label="Zobrazované jméno"
        helperText="Celé jméno, které se bude zobrazovat ostatním uživatelům v aplikaci. Můžete použít například tituly a prostřední jméno."
      />
    </>
  )
}

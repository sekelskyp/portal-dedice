import { useMutation, useQuery } from '@apollo/client'
import { Card, Heading, HStack, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { gql } from '@frontend/gql'
import { ProfileInput } from '@frontend/gql/graphql'
import { useAuth } from '@frontend/modules/auth'
import { Radio, toaster } from '@frontend/shared/design-system'
import {
  AddressGroupFormControl,
  Form,
  InputFormControl,
  RadioGroupFormControl,
  SubmitButton,
} from '@frontend/shared/forms'
import { SwitchFormControl } from '@frontend/shared/forms/SwitchFormControl'

const GET_PROFILE_QUERY = gql(/* GraphQL */ `
  query GetUserById($getUserByIdId: Float!) {
    getUserById(id: $getUserByIdId) {
      id
      email
      password
      confirmed
      type
      notaryId
      sendNotifications
      name
      surname
      displayName
      gender
      phone
      addressId
      address {
        id
        street
        streetNumber
        municipality
        postalCode
      }
    }
  }
`)

const UPDATE_PROFILE_MUTATION = gql(/* GraphQL */ `
  mutation UpdateProfile($profileInput: ProfileInput!) {
    updateProfile(profileInput: $profileInput) {
      id
      email
      password
      confirmed
      type
      notaryId
      sendNotifications
      name
      surname
      displayName
      gender
      phone
      addressId
      address {
        id
        street
        streetNumber
        municipality
        postalCode
      }
    }
  }
`)

export const ProfilePage = () => {
  const auth = useAuth()

  const { data, loading } = useQuery(GET_PROFILE_QUERY, {
    variables: { getUserByIdId: +auth.user!.id },
  })

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    onError: (error) => {
      toaster.error({ title: 'Nepodařilo se uložit profil' })
    },
  })

  const onSubmit = (variables: z.infer<typeof schema>) => {
    return updateProfile({
      variables: {
        profileInput: {
          name: variables.name,
          surname: variables.surname,
          displayName: variables.displayName,
          phone: variables.phone,
          gender: variables.gender,
          sendNotifications: variables.sendNotifications,
          addressInput: {
            street: variables.addressInput.street ?? '',
            streetNumber: variables.addressInput.streetNumber ?? '',
            municipality: variables.addressInput.municipality ?? '',
            postalCode: variables.addressInput.postalCode ?? '',
          },
        },
      },
    })
      .then((res) => {
        if (!res.data)
          throw new Error('No data returned from updateProfile mutation')

        toaster.success({ title: 'Profil byl úspěšně uložen.' })
        auth.signIn({
          token: auth.token,
          user: {
            ...auth.user!,
            ...res.data.updateProfile,
          },
        })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se uložit profil.' })
      })
  }

  return (
    <Card.Root variant="subtle">
      <Card.Header>
        <Heading size={{ base: 'xl', sm: '2xl' }}>Profil</Heading>
      </Card.Header>
      <Card.Body>
        <ProfileForm
          loading={loading}
          defaultValues={{
            name: data?.getUserById?.name ?? '',
            surname: data?.getUserById?.surname ?? '',
            displayName: data?.getUserById?.displayName ?? '',
            phone: data?.getUserById?.phone ?? '',
            gender: data?.getUserById?.gender ?? '',
            sendNotifications: data?.getUserById?.sendNotifications ?? false,
            addressInput: {
              street: data?.getUserById?.address?.street ?? '',
              streetNumber: data?.getUserById?.address?.streetNumber ?? '',
              municipality: data?.getUserById?.address?.municipality ?? '',
              postalCode: data?.getUserById?.address?.postalCode ?? '',
            },
          }}
          onSubmit={onSubmit}
        />
      </Card.Body>
    </Card.Root>
  )
}

const schema = z.object({
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

const ProfileForm = ({
  loading,
  defaultValues,
  onSubmit,
}: {
  loading: boolean
  defaultValues: z.infer<typeof schema>
  onSubmit: (variables: z.infer<typeof schema>) => void
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
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
        <SubmitButton alignSelf="end" px={8}>
          Uložit
        </SubmitButton>
      </Stack>
    </Form>
  )
}

const calculateDisplayName = (name?: string, surname?: string) => {
  let displayName = ''
  if (name?.trim()) displayName += name

  if (surname?.trim()) displayName += ` ${surname}`

  return displayName
}

const NameGroupFormControl = () => {
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

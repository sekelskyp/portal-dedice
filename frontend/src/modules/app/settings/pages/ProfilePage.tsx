import { Card, Heading } from '@chakra-ui/react'
import { z } from 'zod'

import { ProfileForm, profileFormSchema } from '../components/ProfileForm'
import { useProfile } from '../hooks/useProfile'

export const ProfilePage = () => {
  const { profile, loading, updateProfile } = useProfile()

  const onSubmit = (variables: z.infer<typeof profileFormSchema>) => {
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
            name: profile?.name ?? '',
            surname: profile?.surname ?? '',
            displayName: profile?.displayName ?? '',
            phone: profile?.phone ?? '',
            gender: profile?.gender ?? '',
            sendNotifications: profile?.sendNotifications ?? false,
            addressInput: {
              street: profile?.address?.street ?? '',
              streetNumber: profile?.address?.streetNumber ?? '',
              municipality: profile?.address?.municipality ?? '',
              postalCode: profile?.address?.postalCode ?? '',
            },
          }}
          onSubmit={onSubmit}
        />
      </Card.Body>
    </Card.Root>
  )
}

import { Container, Grid, GridItem } from '@chakra-ui/react'

import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import SideBar from '../SideBar'

import { Heir, ProceedingForm } from './ProceedingForm'

export function Portal() {
  const user = useAuth()

  const handleProceedingFormSubmit = (variables: {
    name: string
    surname: string
    dateOfDeath: string
    address: string
    contactName: string
    contactSurname: string
    contactEmail: string
    heirs: Heir[]
  }) => {
    console.log(JSON.stringify(variables, null, 2))
  }

  if (user.token) {
    return (
      <Page as={Stack} gap={0} justifyContent={'space-between'} h={'full'}>
        <Stack alignItems="center" justifyContent="center" h="full">
          <Heading>Portál Dědice</Heading>
          <Text>Vítejte, {user.user?.email}</Text>
        </Stack>
      </Page>
    )
  } else {
    return <UnauthorizedPage />
  }
}

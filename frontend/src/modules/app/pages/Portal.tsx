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
      <Page>
        <Container maxW="container.xl">
          <Grid w="full" templateColumns="repeat(4, 1fr)" gap="28">
            <GridItem colSpan={1}>
              <SideBar></SideBar>
            </GridItem> 
            <GridItem colSpan={3}>
              <ProceedingForm
                onSubmit={handleProceedingFormSubmit}
              ></ProceedingForm>
            </GridItem>
          </Grid>
        </Container>
      </Page>
    )
  } else {
    return <UnauthorizedPage />
  }
}

import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import SideBar from '@frontend/modules/app/components/SideBar'
import { useAuth } from '@frontend/modules/auth'

import { Page } from '../../../shared/layout/Page'
import { UnauthorizedPage } from '../../../shared/navigation/pages/UnauthorizedPage'

export const PortalLayout = () => {
  const user = useAuth()

  if (user.token) {
    return (
      <Page>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'auto repeat(4, 1fr)',
            xl: 'auto repeat(5, 1fr)',
          }}
          gap={{ base: 4, md: 6 }}
        >
          <GridItem colSpan={1}>
            <SideBar />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, md: 4, xl: 5 }}
            bg="bg.panel"
            border="1px solid"
            borderColor="bg.muted"
            borderRadius="md"
            boxShadow="card"
          >
            <Outlet />
          </GridItem>
        </Grid>
      </Page>
    )
  } else {
    return <UnauthorizedPage />
  }
}

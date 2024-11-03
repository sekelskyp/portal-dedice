import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import SideBar from '@frontend/modules/app/SideBar'
import { useAuth } from '@frontend/modules/auth'

import { UnauthorizedPage } from '../navigation/pages/UnauthorizedPage'

import { Page } from './Page'

export const PortalLayout = () => {
  const user = useAuth()

  if (user.token) {
    return (
      <Page>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(5, 1fr)',
            xl: 'repeat(6, 1fr)',
          }}
          gap={{ base: 4, sm: 6, md: 8 }}
        >
          <GridItem colSpan={1}>
            <SideBar />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 4, xl: 5 }}>
            <Outlet />
          </GridItem>
        </Grid>
      </Page>
    )
  } else {
    return <UnauthorizedPage />
  }
}

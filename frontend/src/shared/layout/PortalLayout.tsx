import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import SideBar from '@frontend/modules/app/SideBar'

import { Page } from './Page'

export const PortalLayout = () => {
  return (
    <Page>
      <Grid templateColumns="repeat(5, 1fr)" gap={12}>
        <GridItem colSpan={1}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={4}>
          <Outlet />
        </GridItem>
      </Grid>
    </Page>
  )
}

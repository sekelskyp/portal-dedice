import { Grid } from '@chakra-ui/react'

export const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Grid
    overflowX="auto"
    maxW="100%"
    gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
  >
    {children}
  </Grid>
)

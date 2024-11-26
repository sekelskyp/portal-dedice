import { gql, useQuery } from '@apollo/client'

const GET_ASSETS = gql`
  query getAssetsByProcedureId($proceedingId: Int!) {
    getAssetsByProceedingId(proceedingId: $proceedingId) {
      id
      proceedingId
      type
      name
      value
      description
      bankName
      carMakeName
      carRegistrationDate
      carType
      cin
    }
  }
`

export const useGetAssets = (proceedingId?: number) => {
  const { data, loading } = useQuery(GET_ASSETS, {
    variables: { proceedingId },
    skip: !proceedingId,
  })

  return { data, loading }
}

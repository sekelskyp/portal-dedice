import { gql, useQuery } from '@apollo/client'

const GET_ASSETS = gql`
  query getAssetsByProcedureId($procedureId: Int!) {
    getAssetsByProcedureId(procedureId: $procedureId) {
      id
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

export const useGetAssets = (procedureId?: number) => {
  return useQuery(GET_ASSETS, {
    variables: { procedureId },
    skip: !procedureId,
  })
}

import { gql, useQuery } from '@apollo/client'

const GET_ASSET = gql`
  query getAssetById($id: Int!) {
    getAssetById(id: $id) {
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

export const useGetAsset = (id?: number) => {
  return useQuery(GET_ASSET, {
    variables: { id },
    skip: !id,
  })
}

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

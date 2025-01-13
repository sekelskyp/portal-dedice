import { gql, useMutation } from '@apollo/client'

export type AssetType =
  | 'Financial instrument'
  | 'Company'
  | 'Automobile'
  | 'Valuables'
  | 'Other'

const CREATE_ASSET = gql`
  mutation createAsset($data: AssetInput!) {
    createAsset(data: $data) {
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

export interface CreateAssetInput {
  proceedingId: number
  type: AssetType
  name: string
  value: number
  description?: string | null
  bankName?: string | null
  carMakeName?: string | null
  carRegistrationDate?: Date | null
  carType?: string | null
  cin?: string | null
}

export const useAddAsset = () => {
  const [createAsset, { loading, error }] = useMutation(CREATE_ASSET, {
    refetchQueries: ['getAssetsByProcedureId'],
  })

  const addAsset = async (
    data: Omit<CreateAssetInput, 'proceedingId'> & {
      inheritanceProcedureId: number
    }
  ) => {
    try {
      const { inheritanceProcedureId, ...rest } = data
      const response = await createAsset({
        variables: {
          data: {
            ...rest,
            proceedingId: inheritanceProcedureId,
          },
        },
      })
      return response.data.createAsset
    } catch (err) {
      throw err
    }
  }

  return { addAsset, loading, error }
}

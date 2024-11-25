import { gql, useMutation } from '@apollo/client'

//TODO: fix query and components

const CREATE_ASSET = gql`
  mutation createAsset($data: AssetInput!) {
    createAsset(data: $data) {
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

//TODO: fix CreateAssetInput

interface CreateAssetInput {
  inheritanceProcedureId: number // Changed from procedureId
  type: string
  name: string
  value: number
  description?: string
  bankName?: string
  carMakeName?: string
  carRegistrationDate?: Date
  carType?: string
  cin?: string
}

export const useAddAsset = () => {
  const [createAsset, { loading, error }] = useMutation(CREATE_ASSET, {
    refetchQueries: ['getAssetsByProcedureId'],
  })

  const addAsset = async (data: CreateAssetInput) => {
    try {
      const response = await createAsset({
        variables: { data },
      })
      return response.data.createAsset
    } catch (err) {
      console.error('Error creating asset:', err)
      throw err
    }
  }

  return { addAsset, loading, error }
}

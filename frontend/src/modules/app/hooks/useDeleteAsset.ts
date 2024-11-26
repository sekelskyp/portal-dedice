import { gql, useMutation } from '@apollo/client'

const DELETE_ASSET = gql`
  mutation DeleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`

export const useDeleteAsset = () => {
  const [deleteAsset, { loading }] = useMutation(DELETE_ASSET, {
    refetchQueries: ['getAssetsByProcedureId'], // match exact query name from useGetAsset
  })

  const removeAsset = async (id: number) => {
    const response = await deleteAsset({
      variables: { id },
    })

    if (!response.data?.deleteAsset) {
      throw new Error('Nepodařilo se smazat majetek')
    }

    return true
  }

  return { removeAsset, loading }
}

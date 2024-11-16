import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'

const GET_PROCEDURE_IDS = gql(/* GraphQL */ `
  query getProcedureIds($id: Int!) {
    getProceduresByBeneficiaryId(beneficiaryId: $id) {
      id
    }
  }
`)

export function useGetBeneficiaryProcedures(id: string) {
  const response = useQuery(GET_PROCEDURE_IDS, { variables: { id: +id } })
  const ids = response.data?.getProceduresByBeneficiaryId
  return ids
}

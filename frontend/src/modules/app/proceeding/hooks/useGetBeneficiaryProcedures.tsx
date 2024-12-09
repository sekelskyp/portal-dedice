/*
import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
*/

//TODO: fix query and components
//TODO: this query is not used anywhere???

/*
const GET_PROCEDURE_IDS = gql( `
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
*/

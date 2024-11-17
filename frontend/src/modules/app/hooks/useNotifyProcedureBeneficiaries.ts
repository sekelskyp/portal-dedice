import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@shared/route'

const NOTIFY_PROCEDURE_BENEFICIARIES = gql(/* GraphQL */ `
  mutation NotifyProcedureBeneficiaries(
    $html: String!
    $subject: String!
    $procedureId: Int!
  ) {
    notifyProcedureBenficiaries(
      html: $html
      subject: $subject
      procedureId: $procedureId
    )
  }
`)

export function useNotifyProcedureBeneficiaries() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [
    notifyProcedureBeneficiariesRequest,
    notifyProcedureBeneficiariesRequestState,
  ] = useMutation(NOTIFY_PROCEDURE_BENEFICIARIES, {
    onCompleted: () => {
      navigate(route.inheritanceProcedure(id))
    },
    onError: () => {},
  })

  return [
    notifyProcedureBeneficiariesRequest,
    notifyProcedureBeneficiariesRequestState,
  ] as const
}

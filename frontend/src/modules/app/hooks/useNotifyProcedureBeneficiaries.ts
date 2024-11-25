import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@shared/route'

//TODO: fix query and components

const NOTIFY_PROCEEDING_BENEFICIARIES = gql(/* GraphQL */ `
  mutation NotifyProcedureBeneficiaries(
    $html: String!
    $subject: String!
    $procedureId: Int!
  ) {
    notifyProcedureBeneficiaries(
      html: $html
      subject: $subject
      proceedingId: $procedureId
    )
  }
`)

export function useNotifyProcedureBeneficiaries() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [
    notifyProcedureBeneficiariesRequest,
    notifyProcedureBeneficiariesRequestState,
  ] = useMutation(NOTIFY_PROCEEDING_BENEFICIARIES, {
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

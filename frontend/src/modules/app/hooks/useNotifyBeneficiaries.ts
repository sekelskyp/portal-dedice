import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { route } from '@shared/route'

const NOTIFY_PROCEEDING_BENEFICIARIES = gql(/* GraphQL */ `
  mutation NotifyProcedureBeneficiaries(
    $html: String!
    $subject: String!
    $proceedingId: Int!
  ) {
    notifyProcedureBeneficiaries(
      html: $html
      subject: $subject
      proceedingId: $proceedingId
    )
  }
`)

export function useNotifyBeneficiaries() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [
    notifyProceedingBeneficiariesRequest,
    notifyProceedingBeneficiariesRequestState,
  ] = useMutation(NOTIFY_PROCEEDING_BENEFICIARIES, {
    onCompleted: () => {
      navigate(route.inheritanceProcedure(id))
    },
    onError: () => {},
  })

  return [
    notifyProceedingBeneficiariesRequest,
    notifyProceedingBeneficiariesRequestState,
  ] as const
}

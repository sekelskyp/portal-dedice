import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { toaster } from '@frontend/shared/design-system'
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
  const { proceedingId } = useParams<{ proceedingId: string }>()
  console.log(proceedingId)

  const [
    notifyProceedingBeneficiariesRequest,
    notifyProceedingBeneficiariesRequestState,
  ] = useMutation(NOTIFY_PROCEEDING_BENEFICIARIES, {
    onCompleted: () => {
      toaster.create({
        title: 'E-mail byl úspěšně odeslán.',
        type: 'success',
        duration: 5000,
      })
      navigate(route.proceeding(proceedingId))
    },
    onError: (error) => {
      toaster.create({
        title: error.message,
        type: 'error',
        duration: 5000,
      })
    },
  })

  return [
    notifyProceedingBeneficiariesRequest,
    notifyProceedingBeneficiariesRequestState,
  ] as const
}

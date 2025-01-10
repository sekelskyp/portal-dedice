import { ApolloError } from '@apollo/client'

import { ProceedingsItem } from '../components/ProceedingsTable'

type ProceedingsResponse = {
  data?: {
    getAllProceedings?: ProceedingsItem[]
    getNotaryProceedingsForUser?: ProceedingsItem[]
    getBeneficiaryProceedingsForUser?: ProceedingsItem[]
  }
  loading: boolean
  error?: ApolloError | undefined
}

export const loadProceedings = (
  isAdmin: boolean,
  isNotary: boolean,
  allProceedings: ProceedingsResponse,
  notaryProceedings: ProceedingsResponse,
  beneficiaryProceedings: ProceedingsResponse
) => ({
  proceedings: isAdmin
    ? allProceedings.data?.getAllProceedings
    : isNotary
      ? notaryProceedings.data?.getNotaryProceedingsForUser
      : beneficiaryProceedings.data?.getBeneficiaryProceedingsForUser,
  loading: isAdmin
    ? allProceedings.loading
    : isNotary
      ? notaryProceedings.loading
      : beneficiaryProceedings.loading,
  error: isAdmin
    ? allProceedings.error
    : isNotary
      ? notaryProceedings.error
      : beneficiaryProceedings.error,
})

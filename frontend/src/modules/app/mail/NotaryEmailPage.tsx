import { useCallback } from 'react'
import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { LuFile } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Alert, toaster } from '@frontend/shared/design-system'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { useNotifyBeneficiaries } from '../proceeding/hooks/useNotifyBeneficiaries'
import { useProceeding } from '../proceeding/hooks/useProceeding'
import { BeneficiaryBadge } from '../proceeding/utils/BeneficiaryBadge'

import { NotaryEmailForm } from './NotaryEmailForm'

export function NotaryEmailPage() {
  const { user, token } = useAuth()
  const { id } = useParams()
  const isNotary = user?.type === 'Notary'

  const [
    notifyProceedingBeneficiariesRequest,
    notifyProceedingBeneficiariesRequestState,
  ] = useNotifyBeneficiaries()

  const { data, loading, error } = useProceeding(parseInt(id ?? '0', 10))

  const handleNotaryEmailFormSubmit = useCallback(
    (variables: { html: string; subject: string }) => {
      notifyProceedingBeneficiariesRequest({
        variables: {
          html: variables.html,
          subject: variables.subject,
          proceedingId: parseInt(id ?? '0', 10),
        },
      }).then(() => {
        toaster.create({
          title: 'E-mail byl úspěšně odeslán.',
          type: 'success',
          duration: 5000,
        })
      })
    },
    [notifyProceedingBeneficiariesRequest, id]
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <NotFoundPage />
  }

  if (!isNotary) {
    return <NotFoundPage />
  }

  const proceeding = data?.getProceedingById

  if (!proceeding) {
    return <NotFoundPage />
  }

  if (!token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack
        gap={4}
        borderRadius="xl"
        p={{ base: 4, md: 10 }}
        borderWidth="1px"
      >
        <Heading
          size={{ base: 'xl', md: '2xl', lg: '3xl' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Hromadná zpráva všem dědicům
        </Heading>
        <Stack
          direction="row"
          alignItems="center"
          py={2}
          justifyContent={{ base: 'center', md: 'start' }}
        >
          <LuFile size={24} />
          <Heading>{proceeding?.name}</Heading>
        </Stack>
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Vytvořte hromadnou zprávu, která bude odeslána všem dědicům v tomto
          řízení.
        </Text>
        <Stack alignItems="start">
          <Heading>Notář</Heading>
          {proceeding.notary?.user ? (
            <BeneficiaryBadge beneficiaryContact={proceeding.notary?.user} />
          ) : (
            <Alert status="warning">Notář bez kontaktních údajů.</Alert>
          )}
          <Heading>Dědici</Heading>
          <Stack direction={{ base: 'column', md: 'row' }} alignItems="start">
            {proceeding.beneficiaries?.map((beneficiary) =>
              !!beneficiary.user ? (
                <BeneficiaryBadge
                  key={beneficiary.id}
                  beneficiaryContact={{
                    ...beneficiary.user,
                  }}
                />
              ) : (
                <Alert status="warning" key={beneficiary.id}>
                  Dědic bez kontaktních údajů.
                </Alert>
              )
            )}
          </Stack>
        </Stack>
        <NotaryEmailForm
          onSubmit={handleNotaryEmailFormSubmit}
          procedureId={parseInt(id ?? '0', 10)}
          requestState={notifyProceedingBeneficiariesRequestState}
        />
      </Stack>
    )
  }
}

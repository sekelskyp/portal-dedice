import { useCallback } from 'react'
import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { LuFile } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { UserBadge } from '../../../../shared/components/UserBadge'
import { useProceeding } from '../../proceeding/hooks/useProceeding'
import { NotaryEmailForm } from '../components/NotaryEmailForm'
import { useNotifyBeneficiaries } from '../hooks/useNotifyBeneficiaries'

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
          <UserBadge
            user={proceeding.notary?.user}
            issueText="Notář bez kontaktních údajů."
          />
          <Heading>Dědici</Heading>
          <Stack direction={{ base: 'column', md: 'row' }} alignItems="start">
            {proceeding.beneficiaries?.map((beneficiary, index) => (
              <UserBadge
                key={beneficiary?.id ?? index}
                user={beneficiary?.user}
                issueText="Dědic bez kontaktních údajů."
              />
            ))}
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

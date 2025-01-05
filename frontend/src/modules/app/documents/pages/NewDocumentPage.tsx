import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { LuFile } from 'react-icons/lu'

import { useAuth } from '@frontend/modules/auth'
import { AccordionHelper } from '@frontend/modules/wizard/components/accordion/AccordionHelper'
import { Alert } from '@frontend/shared/design-system'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { useProceedingContext } from '../../proceeding/components/ProceedingLayout'
import { DocumentUpload } from '../components/DocumentUpload'
import { documentTypes } from '../utils/documentTypes'

export function NewDocumentPage() {
  const user = useAuth()

  const { proceeding, loading, error } = useProceedingContext()

  if (loading) return <Spinner />

  if (error)
    return (
      <Alert
        status="error"
        title={
          error.message ?? 'Chyba při načítání stránky pro přidání dokumentu.'
        }
      />
    )

  const proceedingBeneficiaryIds = proceeding?.beneficiaries?.map(
    (b) => b.user?.id
  )

  if (!user.user?.id || !proceedingBeneficiaryIds?.includes(user.user?.id)) {
    return <UnauthorizedPage />
  }

  return (
    <Stack gap={4} borderRadius="xl" p={{ base: 4, md: 10 }} borderWidth="1px">
      <Stack direction="column">
        <Heading
          size={{ base: 'xl', md: '2xl', lg: '3xl' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Nahrání nové přílohy
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
      </Stack>
      <Stack direction="column" gap={4}>
        <Stack direction="column" gap={4}>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Pro zrychlení dědického řízení pomůže, když notáři doložíte tyto
            dokumenty:
          </Text>
          <AccordionHelper items={documentTypes} />
        </Stack>
        <Stack gap={4} alignItems="center">
          <DocumentUpload />
        </Stack>
      </Stack>
    </Stack>
  )
}

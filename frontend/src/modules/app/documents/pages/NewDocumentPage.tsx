import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { LuFile } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { AccordionHelper } from '@frontend/modules/wizard/components/accordion/AccordionHelper'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { useProceeding } from '../../proceeding/hooks/useProceeding'
import { DocumentUpload } from '../components/DocumentUpload'
import { documentTypes } from '../utils/documentTypes'

export function NewDocumentPage() {
  const user = useAuth()
  const { id } = useParams()

  const { data, loading, error } = useProceeding(parseInt(id ?? '0', 10))

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <NotFoundPage />
  }

  const proceeding = data?.getProceedingById
  const proceedingBeneficiaryIds = proceeding?.beneficiaries?.map(
    (b) => b.user?.id
  )

  if (!user.user?.id || !proceedingBeneficiaryIds?.includes(user.user?.id)) {
    return <UnauthorizedPage />
  }

  if (!user.token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack
        gap={4}
        borderRadius="xl"
        p={{ base: 4, md: 10 }}
        borderWidth="1px"
      >
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
}

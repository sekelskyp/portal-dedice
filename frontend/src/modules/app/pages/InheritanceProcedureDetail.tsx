import React from 'react'
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Spinner,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { FaCalculator } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { HiChat } from 'react-icons/hi'
import { LuFile } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import { Assets } from '../components/Assets'
import { BeneficiaryBadge } from '../components/BeneficiaryBadge'
import { Documents } from '../components/Documents'
import { StatusBadge } from '../components/StatusBadge'
import { useProcedure } from '../hooks/useProcedure'

const InheritanceProcedureDetail: React.FC = () => {
  const user = useAuth()
  const { id } = useParams()

  const { data, loading, error } = useProcedure({
    procedureId: parseInt(id ?? '0', 10),
  })

  if (loading) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text>{error.message}</Text>
      </Box>
    )
  }

  const procedure = data?.getProcedureById

  console.log(procedure)

  const totalAssetsValue =
    procedure?.procedureAssets?.reduce((sum, asset) => sum + asset.value, 0) ??
    0

  if (!user.token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack display="flex" alignItems="center" justifyContent="center">
        {procedure ? (
          <Card.Root w="full">
            <Card.Header as={HStack} gap={4}>
              <LuFile size={24} />
              <Heading>{procedure?.name}</Heading>
              <StatusBadge ml="auto" state={procedure.state} />
            </Card.Header>
            <Card.Body gap={4}>
              <Tabs.Root defaultValue="detail" size={{ base: 'sm', md: 'lg' }}>
                <Tabs.List>
                  <Tabs.Trigger value="detail">Detail řízení</Tabs.Trigger>
                  <Tabs.Trigger value="documents">Dokumenty</Tabs.Trigger>
                  <Tabs.Trigger value="assets"> Majetek</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="detail">
                  <Stack>
                    <Heading
                      size={'xl'}
                      textAlign={{ base: 'center', lg: 'left' }}
                    >
                      Hlavní kontaktní osoba
                    </Heading>
                    {procedure.mainContact ? (
                      <BeneficiaryBadge
                        beneficiaryContact={procedure.mainContact}
                      />
                    ) : (
                      <Alert status="warning">
                        Dědic bez kontaktních údajů.
                      </Alert>
                    )}
                  </Stack>
                  <Stack>
                    <Heading
                      size={'xl'}
                      textAlign={{ base: 'center', lg: 'left' }}
                    >
                      Přiřazený notář
                    </Heading>
                    {procedure.notary?.contact ? (
                      <BeneficiaryBadge
                        beneficiaryContact={procedure.notary.contact}
                      />
                    ) : (
                      <Alert status="warning">
                        Notář bez kontaktních údajů.
                      </Alert>
                    )}
                  </Stack>
                  <Stack>
                    <Heading
                      size={{ base: 'lg', lg: 'xl' }}
                      py={4}
                      textAlign={{ base: 'center', lg: 'left' }}
                    >
                      Výpis dědiců
                    </Heading>
                    {procedure.beneficiaries?.map((beneficiary) =>
                      beneficiary.contact ? (
                        <BeneficiaryBadge
                          key={beneficiary.id}
                          beneficiaryContact={beneficiary.contact}
                        />
                      ) : (
                        <Alert status="warning" key={beneficiary.id}>
                          Dědic bez kontaktních údajů.
                        </Alert>
                      )
                    )}
                  </Stack>
                  <Heading
                    size={{ base: 'lg', lg: 'xl' }}
                    py={4}
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    Celková hodnota majetku
                  </Heading>
                  {procedure.procedureAssets?.length === 0 ? (
                    <Stack alignItems={{ base: 'center', lg: 'start' }}>
                      <Text fontSize="md">Tuto hodnotu zatím neznáme.</Text>
                      <Button
                        as={Link}
                        disabled
                        width="fit-content"
                        rounded="full"
                      >
                        Modelace
                        <FaCalculator />
                      </Button>
                    </Stack>
                  ) : (
                    <Text
                      fontSize="lg"
                      textAlign={{ base: 'center', lg: 'left' }}
                    >
                      {totalAssetsValue},- Kč
                    </Text>
                  )}

                  <Heading
                    size={{ base: 'lg', lg: 'xl' }}
                    py={4}
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    Návrh vypořádaní ze strany zůstavitele
                  </Heading>
                  <Text
                    fontSize="md"
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    Tuto hodnotu zatím neznáme.
                  </Text>
                  <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    justifyContent="center"
                  >
                    {!user.user?.isNotary ? (
                      <>
                        <Button as={Link} disabled rounded="full">
                          Modelace vyrovnaní
                          <FaCalculator />
                        </Button>
                        <RouterNavLink
                          to={route.chatId(id, procedure.name)}
                          rounded="full"
                        >
                          Chat s notářem
                          <HiChat />
                        </RouterNavLink>
                      </>
                    ) : (
                      <>
                        <RouterNavLink to={route.newEmail(id)} rounded={'full'}>
                          Hromadná zpráva všem dědicům
                          <FiSend />
                        </RouterNavLink>
                      </>
                    )}
                  </Stack>
                </Tabs.Content>
                <Tabs.Content value="documents">
                  <Documents id={id ?? ''} />
                </Tabs.Content>
                <Tabs.Content value="assets">
                  <Assets id={id ?? ''} />
                </Tabs.Content>
              </Tabs.Root>
            </Card.Body>
          </Card.Root>
        ) : (
          <Text>No procedure found</Text>
        )}
      </Stack>
    )
  }
}

export default InheritanceProcedureDetail

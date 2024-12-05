import React from 'react'
import {
  Box,
  Card,
  Heading,
  HStack,
  Spinner,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { LuFile } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { Assets } from '../assets/tab/Assets'
import { Documents } from '../components/Documents'
import { ProceedingDetail } from '../components/ProceedingDetail'
import { RewardCalculator } from '../components/RewardCalculator'
import { StatusBadge } from '../components/StatusBadge'
import { useProceeding } from '../hooks/useProceeding'

//TODO: fix query and components

const InheritanceProcedureDetail: React.FC = () => {
  const user = useAuth()
  const { id } = useParams()

  const { data, loading, error } = useProceeding(+id!)

  const proceeding = data?.getProceedingById

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

  if (!user.token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack display="flex" alignItems="center" justifyContent="center">
        {proceeding ? (
          <Card.Root w="full">
            <Card.Header as={HStack} gap={4}>
              <LuFile size={24} />
              <Heading>{proceeding?.name}</Heading>
              <StatusBadge ml="auto" state={proceeding.state} />
            </Card.Header>
            <Card.Body gap={4}>
              <Tabs.Root
                defaultValue="detail"
                size={{ base: 'sm', md: 'lg' }}
                orientation="horizontal"
              >
                <Tabs.List
                  width={{ base: 'full', md: 'auto' }}
                  flexDirection={{ base: 'column', md: 'row' }}
                >
                  <Tabs.Trigger
                    value="detail"
                    width={{ base: 'full', md: 'auto' }}
                  >
                    Detail řízení
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="documents"
                    width={{ base: 'full', md: 'auto' }}
                  >
                    Dokumenty
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="assets"
                    width={{ base: 'full', md: 'auto' }}
                  >
                    Majetek
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="reward"
                    width={{ base: 'full', md: 'auto' }}
                  >
                    Výpočet odměny notáře
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="detail">
                  <ProceedingDetail proceeding={proceeding} />
                </Tabs.Content>
                <Tabs.Content value="documents">
                  <Documents id={id ?? ''} />
                </Tabs.Content>
                <Tabs.Content value="assets">
                  <Assets id={id ?? ''} />
                </Tabs.Content>
                <Tabs.Content value="reward">
                  <RewardCalculator />
                </Tabs.Content>
              </Tabs.Root>
            </Card.Body>
          </Card.Root>
        ) : (
          <Text>Řízení nebylo nalezeno.</Text>
        )}
      </Stack>
    )
  }
}

export default InheritanceProcedureDetail

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

import { Alert } from '@frontend/shared/design-system'

import { Assets } from '../../assets/tab/Assets'
import { Documents } from '../../documents/tab/Documents'
import { useProceedingContext } from '../components/ProceedingLayout'
import { RewardCalculator } from '../components/RewardCalculator'
import { StatusBadge } from '../components/StatusBadge'

import { ProceedingDetail } from './ProceedingDetail'

export const ProceedingPage = () => {
  const { loading, proceeding, error } = useProceedingContext()

  if (loading) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
      </Box>
    )
  }

  if (error)
    return (
      <Alert
        status="error"
        title={error?.message || 'Chyba při načítání řízení.'}
      />
    )

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
                <Documents id={proceeding.id} />
              </Tabs.Content>
              <Tabs.Content value="assets">
                <Assets id={proceeding.id} />
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

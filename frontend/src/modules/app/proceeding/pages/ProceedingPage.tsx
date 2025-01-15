import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  Editable,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { LockIcon } from 'lucide-react'
import { LuCheck, LuFile, LuPencilLine, LuX } from 'react-icons/lu'

import { Alert, Button } from '@frontend/shared/design-system'

import { Assets } from '../../assets/tab/Assets'
import { Documents } from '../../documents/tab/Documents'
import { useProceedingContext } from '../components/ProceedingLayout'
import { RewardCalculator } from '../components/RewardCalculator'
import { StatusBadge } from '../components/StatusBadge'

import { ProceedingDetail } from './ProceedingDetail'

export const ProceedingPage = () => {
  const {
    loading,
    proceeding,
    error,
    isEditable,
    setName: commitName,
    close,
  } = useProceedingContext()
  const [name, setName] = useState(proceeding?.name ?? '')

  useEffect(() => {
    setName(proceeding?.name ?? '')
  }, [proceeding, setName])

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
          <Card.Header as={Stack} gap={3}>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              gap={3}
              width="full"
            >
              <HStack flex="1" gap={3}>
                <LuFile size={24} />
                {isEditable ? (
                  <Editable.Root
                    value={name}
                    onValueChange={(e) => setName(e.value)}
                    onValueCommit={(e) => commitName(e.value)}
                    placeholder="Click to edit"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    <Editable.Preview />
                    <Editable.Input />
                    <Editable.Control>
                      <Editable.EditTrigger asChild>
                        <IconButton variant="ghost" size="xs">
                          <LuPencilLine />
                        </IconButton>
                      </Editable.EditTrigger>
                      <Editable.CancelTrigger asChild>
                        <IconButton variant="outline" size="xs">
                          <LuX />
                        </IconButton>
                      </Editable.CancelTrigger>
                      <Editable.SubmitTrigger asChild>
                        <IconButton variant="outline" size="xs">
                          <LuCheck />
                        </IconButton>
                      </Editable.SubmitTrigger>
                    </Editable.Control>
                  </Editable.Root>
                ) : (
                  <Heading>{proceeding.name}</Heading>
                )}
              </HStack>
              <HStack
                gap={3}
                justifyContent={{ base: 'flex-start', md: 'flex-end' }}
              >
                <StatusBadge state={proceeding.state} />
                {isEditable && proceeding.state !== 'Closed' && (
                  <Button
                    borderRadius="full"
                    size="xs"
                    px={4}
                    fontSize="sm"
                    gap={2}
                    bg="fg.error"
                    color="bg.error"
                    onClick={() => close()}
                  >
                    <LockIcon /> Uzavřít
                  </Button>
                )}
              </HStack>
            </Stack>
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
                <ProceedingDetail />
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

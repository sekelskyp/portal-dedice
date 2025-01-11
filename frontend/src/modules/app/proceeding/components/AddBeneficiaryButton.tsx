import { useState } from 'react'
import { Box, createListCollection, Fieldset, Stack } from '@chakra-ui/react'

import { useAuth } from '@frontend/modules/auth'
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@frontend/shared/design-system'
import { Form, SelectFormControl, SubmitButton } from '@frontend/shared/forms'

import { useGetUsers } from '../hooks/useGetUsers'

import { useProceedingContext } from './ProceedingLayout'
import { UserBadgeAssignButton } from './UserBadgeAssignButton'

export const AddBeneficiaryButton = () => {
  const { addBeneficiaries } = useProceedingContext()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAddBeneficiaries = ({ userIds }: { userIds: string[] }) => {
    setLoading(true)
    setOpen(false)
    addBeneficiaries(userIds).finally(() => setLoading(false))
  }

  return (
    <Box>
      <UserBadgeAssignButton
        text={loading ? 'Přidávání dědiců...' : 'Přidat dědice'}
        onClick={() => setOpen(true)}
        loading={loading}
      />
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="center"
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Přidat dědice</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <AddBeneficiaryForm onSubmit={handleAddBeneficiaries} />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  )
}

const AddBeneficiaryForm = ({
  onSubmit,
}: {
  onSubmit: (variables: { userIds: string[] }) => void
}) => {
  const { user } = useAuth()

  const { data } = useGetUsers({ type: 'User' })

  const { proceeding } = useProceedingContext()

  const otherUsers = createListCollection({
    items:
      data?.getAllUserByType
        ?.filter(
          (u) =>
            u.id !== user?.id &&
            !proceeding?.beneficiaries?.some((b) => b.user?.id === u.id)
        )
        .map((user) => ({
          label: `${user.name} ${user.surname}`,
          value: user.id,
        })) || [],
  })

  if (otherUsers.items.length === 0) {
    return (
      <Stack gap={6}>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <p>Nejsou k dispozici žádní další uživatelé.</p>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      noValidate
      defaultValues={{
        userIds: [],
      }}
    >
      <Stack gap={6}>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <SelectFormControl
              name="userIds"
              collection={otherUsers}
              label="Další dědicové"
              multiple
            />
          </Fieldset.Content>
        </Fieldset.Root>
        <SubmitButton>Přidat dědice</SubmitButton>
      </Stack>
    </Form>
  )
}

import { useState } from 'react'
import { Box, createListCollection, Fieldset, Stack } from '@chakra-ui/react'

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

import { useProceedingContext } from './ProceedingLayout'
import { UserBadgeAssignButton } from './UserBadgeAssignButton'

export const AssignMainBeneficiaryButton = () => {
  const { assignMainBeneficiary } = useProceedingContext()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAssignMainBeneficiary = ({
    beneficiaryId,
  }: {
    beneficiaryId: number
  }) => {
    setLoading(true)
    setOpen(false)
    assignMainBeneficiary(beneficiaryId).finally(() => setLoading(false))
  }

  return (
    <Box>
      <UserBadgeAssignButton
        text={
          loading
            ? 'Nastavování hlavní kontaktní osoby...'
            : 'Nastavit hlavní kontaktní osobu'
        }
        onClick={() => setOpen(true)}
        loading={loading}
      />
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside={false} // This is workaround for issue on mobile devices
        placement="center"
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Nastavit hlavní kontaktní osobu</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <AssignMainBeneficiaryForm onSubmit={handleAssignMainBeneficiary} />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  )
}

const AssignMainBeneficiaryForm = ({
  onSubmit,
}: {
  onSubmit: (variables: { beneficiaryId: number }) => void
}) => {
  const { proceeding } = useProceedingContext()

  const beneficiariesList = createListCollection({
    items:
      proceeding?.beneficiaries?.map((b) => {
        return {
          label: `${b.user?.name} ${b.user?.surname}`,
          value: +b.id,
        }
      }) ?? [],
  })

  if (beneficiariesList.items.length === 0) {
    return (
      <Stack gap={6}>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <p>Nejsou k dispozici žádní dědicové.</p>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    )
  }

  return (
    <Form onSubmit={onSubmit} noValidate defaultValues={{}}>
      <Stack gap={6}>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <SelectFormControl
              name="beneficiaryId"
              collection={beneficiariesList}
              label="Další dědicové"
              multiple={false}
            />
          </Fieldset.Content>
        </Fieldset.Root>
        <SubmitButton>Nastavit dědice jako hlavní kontaktní osobu</SubmitButton>
      </Stack>
    </Form>
  )
}

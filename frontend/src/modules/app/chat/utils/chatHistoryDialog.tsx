import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@chakra-ui/react'

export function chatHistoryDialog() {
  return (
    <DialogRoot>
      <DialogBackdrop />
      <DialogTrigger />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogBody />
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  )
}

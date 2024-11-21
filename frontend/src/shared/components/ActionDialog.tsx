import {
  Button,
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  toaster,
} from '../design-system/atoms/chakra'

interface ActionDialogProps {
  title: string
  text: string
  actionText: string
  isOpen: boolean
  toggle: (state: boolean) => void
  onConfirm: (id: string) => void
  selectedId?: string
}

export function ActionDialog({
  title,
  text,
  actionText,
  toggle,
  isOpen,
  onConfirm,
  selectedId,
}: ActionDialogProps) {
  const handleConfirm = () => {
    if (!selectedId) return
    onConfirm(selectedId)
    toggle(false)
    toaster.create({
      title: actionText,
      type: 'success',
      duration: 5000,
    })
  }

  return (
    <DialogRoot
      placement="top"
      motionPreset="slide-in-bottom"
      lazyMount
      open={isOpen}
      onOpenChange={(e) => toggle(e.open)}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{text}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild bg="red.700" color="bg.muted">
            <Button variant="outline" onClick={() => toggle(false)}>
              Zrušit
            </Button>
          </DialogActionTrigger>
          <Button bg="green.700" onClick={handleConfirm}>
            Potvrdit
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

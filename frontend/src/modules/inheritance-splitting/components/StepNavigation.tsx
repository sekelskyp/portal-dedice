import { useState } from 'react'
import {
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  HStack,
  Portal,
  VStack,
} from '@chakra-ui/react'

import { RouterNavLink } from '@frontend/shared/navigation/atoms/RouterNavLink'
import { route } from '@shared/route'

interface StepNavigationProps {
  onPrevious: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export const StepNavigation = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}: StepNavigationProps) => {
  const [open, setOpen] = useState(false)
  return (
    <HStack justify="space-between" width="100%" mt={4}>
      <Button
        onClick={onPrevious}
        visibility={isFirstStep ? 'hidden' : 'visible'}
      >
        Předchozí krok
      </Button>
      {isLastStep ? (
        <DialogRoot
          placement="bottom"
          lazyMount
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <DialogTrigger asChild>
            <Button onClick={onNext}>Dokončit</Button>
          </DialogTrigger>
          <Portal>
            <DialogBackdrop>
              <DialogContent>
                <VStack>
                  <DialogHeader>
                    <DialogTitle>Děkujeme za využití </DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <p>
                      Pokud chcete, můžete modelaci udělat znovu a jinak. Pokud
                      si přejete přejít jinam, klikněte na tlačítko "Zpět na
                      domovskou stránku"
                    </p>
                  </DialogBody>
                  <DialogFooter>
                    <RouterNavLink to={route.home()}>
                      Zpět na domovskou stránku
                    </RouterNavLink>
                    <RouterNavLink to={route.inheritance()}>
                      Zkusit další vypořádaní
                    </RouterNavLink>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </VStack>
              </DialogContent>
            </DialogBackdrop>
          </Portal>
        </DialogRoot>
      ) : (
        <Button onClick={onNext}>{'Další krok'}</Button>
      )}
    </HStack>
  )
}

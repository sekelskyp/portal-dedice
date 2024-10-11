import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

export type SingUpModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function SignUpModal({ isOpen, onClose }: SingUpModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">Dokončení registrace</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Text fontSize="lg">
            Na váš email jsme zaslali potvrzení k registraci. Pro přihlášení do
            aplikace, je potřeba potvrdit Vaší emailovou adresu kliknutím na
            odkaz v emailu.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Zavřít</Button>
        </ModalFooter>
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size="md">Dokončení registrace</Heading>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Text fontSize="lg">
                Na váš email jsme zaslali potvrzení k registraci. Pro přihlášení
                do aplikace, je potřeba potvrdit Vaší emailovou adresu kliknutím
                na odkaz v emailu.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Zavřít</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ModalContent>
    </Modal>
  )
}

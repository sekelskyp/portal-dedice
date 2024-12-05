import { Flex, Heading, Text } from '@chakra-ui/react'

import resources from '@frontend/resources'
import { Button, Tooltip } from '@frontend/shared/design-system'
import { SimpleCentered } from '@frontend/shared/design-system/atoms/CTA/SimpleCentered'

interface NotaryAssignmentHelperProps {
  nextStep: () => void
  previousStep: () => void
  isOpen: boolean
  openTooltip: () => void
  closeTooltip: () => void
  toggleTooltip: () => void
}

export function NotaryAssignmentHelper({
  nextStep,
  previousStep,
  isOpen,
  openTooltip,
  closeTooltip,
  toggleTooltip,
}: NotaryAssignmentHelperProps) {
  return (
    <SimpleCentered bg="blue.bg">
      <Heading size={{ base: 'sm', sm: 'md', md: 'lg', lg: '2xl' }}>
        Nevíte jak dál?
      </Heading>
      <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}>
        Pojďte se v naší{' '}
        <Tooltip
          content={resources.wizard.notaryAssignment.tooltip}
          showArrow
          open={isOpen}
          portalled
        >
          <Text
            as="u"
            onMouseLeave={closeTooltip}
            onMouseEnter={openTooltip}
            onClick={toggleTooltip}
          >
            aplikaci
          </Text>
        </Tooltip>{' '}
        dozvědět více o tom, co vás čeká v pozůstalostním řízení.
      </Text>
      <Flex justify="space-between" gap={4}>
        <Button bg="gray.500" onClick={previousStep} size="lg">
          {resources.wizard.testatorIdentification.CTA.previous}
        </Button>
        <Button onClick={nextStep} size="lg">
          {resources.wizard.testatorIdentification.CTA.next}
        </Button>
      </Flex>
    </SimpleCentered>
  )
}

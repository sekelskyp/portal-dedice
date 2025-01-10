import { ReactNode } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  List,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react'

interface StepLayoutProps {
  children: ReactNode
  title: string
  description?: string
  tooltip?: string
}

export const StepLayout = ({
  children,
  title,
  tooltip,
  description,
}: StepLayoutProps) => {
  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6} align="stretch">
        <Box
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <VStack align="start" gap={4} mb={6}>
            <Heading size="lg">{title}</Heading>
            {/*
            {description && (
              <Text color="gray.600" fontSize="md">
              {description}
              </Text>
              )}
              */}
            {tooltip && (
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Button variant="outline">Jak postupovat?</Button>
                </PopoverTrigger>
                <PopoverContent minW={{ base: '100%' }}>
                  <PopoverArrow />
                  <PopoverBody>
                    <List.Root as="ol" spaceY={2}>
                      <List.Item fontSize={'md'}>
                        Přidávejte položky majetku zůstavitele/ky pomocí ikony +
                      </List.Item>
                      <List.Item fontSize={'md'}>
                        Název položky majetku slouží k Vaší orientaci, není
                        povinný
                      </List.Item>
                      <List.Item fontSize={'md'}>
                        V případě, že zůstavitel/ka má uzavřené manželství, je
                        potřeba uvést též majetek pozůstalé/ho manžela/manželky,
                        který spadá do SJM. Výlučný majetek pozůstalé/ho
                        manžela/manželky zde neuvádějte.
                      </List.Item>
                      <List.Item fontSize={'md'}>
                        SJM (Společné Jmění Manželů): v případě, že majetek
                        nabyli manželé za trvání manželství, tak spadá do SJM.
                        To platí i pro účty, které jsou vedené na jméno jednoho
                        z manželů. Majetek nepatří do SJM pouze v případě, že
                        jej zůstavitel/ka získal/a před uzavřením manželství,
                        nebo během manželství např. darem, nebo dědictvím.
                        Použijte pole ve sloupci SJM k určení či je položka
                        výlučným majetkem zůstavitele/zůstavitelky.
                      </List.Item>
                    </List.Root>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            )}
          </VStack>
          {children}
        </Box>
      </VStack>
    </Container>
  )
}

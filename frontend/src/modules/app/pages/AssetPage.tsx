import React, { useState } from 'react'
import {
  Box,
  Button,
  createListCollection,
  Heading,
  Separator,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form } from '@frontend/shared/forms/Form'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'

import { Checkbox } from '../../../shared/design-system/atoms/chakra/checkbox'

const assetSchema = z.object({
  bankAccount: z.object({
    selected: z.boolean(),
    bank: z.string({ required_error: 'Vyberte bankovní instituci' }),
  }),
  company: z.object({
    selected: z.boolean(),
    ico: z
      .string({ required_error: 'Zadejte IČO' })
      .regex(/^\d{8}$/, { message: 'Zadejte platné IČO (8 číslic)' }),
  }),
  car: z.object({
    selected: z.boolean(),
    brand: z.string({ required_error: 'Vyberte značku' }),
    year: z
      .number({ required_error: 'Zadejte rok' })
      .refine((val) => val >= 1900 && val <= new Date().getFullYear(), {
        message: 'Zadejte platný rok',
      }),
    description: z.string({
      required_error: 'Zadejte popis zůstavitelova auta',
    }),
  }),
  valuables: z.object({
    selected: z.boolean(),
    description: z
      .string({ required_error: 'Zadejte jaké cennosti zůstavitel vlastnil.' })
      .max(300, { message: 'Maximálně 300 znaků' }),
  }),
  others: z.object({
    selected: z.boolean(),
    description: z
      .string({ required_error: 'Zadejte co jiného zůstavitel vlastnil.' })
      .max(300, { message: 'Maximálně 300 znaků' }),
  }),
})

const bankAccountCollection = createListCollection({
  items: [
    { value: 'Česká spořitelna', label: 'Česká spořitelna' },
    { value: 'Komerční banka', label: 'Komerční banka' },
    { value: 'ČSOB', label: 'ČSOB' },
  ],
})

const carBrandCollection = createListCollection({
  items: [
    { value: 'Škoda', label: 'Škoda' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Audi', label: 'Audi' },
  ],
})

interface SectionProps {
  title: string
  children: React.ReactNode
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  selected,
  setSelected,
}) => (
  <Box>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      m={2}
    >
      <Box>{title}</Box>
      <Box display="flex" alignItems="center">
        <Box mr={2}>žádné</Box>
        <Checkbox
          checked={selected}
          onChange={() => setSelected((prev) => !prev)}
        />
      </Box>
    </Box>
    <Separator />
    {!selected && children}
  </Box>
)

const BankAccountSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => (
  <Section
    title="Měl zůstavitel bankovní účet?"
    selected={selected}
    setSelected={setSelected}
  >
    <SelectFormControl
      name="bankAccount.bank"
      label="Bankovní účet"
      collection={bankAccountCollection}
    />
  </Section>
)

const CompanySection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => (
  <Section
    title="Účastnil se v obchodní společnosti?"
    selected={selected}
    setSelected={setSelected}
  >
    <InputFormControl
      name="company.ico"
      label="Obchodní společnost (IČO)"
      placeholder="IČO"
    />
  </Section>
)

const CarSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => (
  <Section
    title="Měl zůstavitel auto?"
    selected={selected}
    setSelected={setSelected}
  >
    <SelectFormControl
      name="car.brand"
      label="Auto - Značka"
      collection={carBrandCollection}
    />
    <InputFormControl
      name="car.year"
      label="Auto - Rok výroby"
      type="number"
      placeholder="Rok výroby"
    />
    <InputFormControl
      name="car.description"
      label="Auto - Popis"
      placeholder="Popis"
    />
  </Section>
)

const ValuablesSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => (
  <Section
    title="Vlastnil zůstavitel nějaké cennosti?"
    selected={selected}
    setSelected={setSelected}
  >
    <InputFormControl
      name="valuables.description"
      label="Cennosti"
      placeholder="(Max. 300 znaků)"
    />
  </Section>
)

const OthersSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => (
  <Section
    title="Vlastnil zůstavitel ještě něco jiného?"
    selected={selected}
    setSelected={setSelected}
  >
    <InputFormControl
      name="others.description"
      label=""
      placeholder="Např. hotovost, nebo šperky, obrazy (max. 300 znaků)"
    />
  </Section>
)

interface AssetSummary {
  bankAccount?: {
    selected: boolean
    bank?: string
  }
  company?: {
    selected: boolean
    ico?: string
  }
  car?: {
    selected: boolean
    brand?: string
    year?: number
    description?: string
  }
  valuables?: {
    selected: boolean
    description?: string
  }
  others?: {
    selected: boolean
    description?: string
  }
}

export const AssetPage = () => {
  const [summary, setSummary] = useState<AssetSummary | null>(null)
  const [sections, setSections] = useState({
    bankAccount: true,
    company: true,
    car: true,
    valuables: true,
    others: true,
  })

  const handleSetSelected =
    (section: keyof typeof sections) =>
    (value: React.SetStateAction<boolean>) => {
      setSections((prev) => ({
        ...prev,
        [section]:
          typeof value === 'function'
            ? (value as (prevState: boolean) => boolean)(prev[section])
            : value,
      }))
    }

  const handleSubmit = (data: AssetSummary) => {
    const filteredData: Partial<AssetSummary> = Object.keys(data)
      .filter((key) => sections[key as keyof typeof sections])
      .reduce(
        (acc, key) => ({ ...acc, [key]: data[key as keyof AssetSummary] }),
        {}
      )

    try {
      assetSchema.parse(filteredData)
      setSummary(filteredData as AssetSummary)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading mb={6}>Určení Majetku</Heading>
      <Form
        onSubmit={handleSubmit}
        resolver={zodResolver(assetSchema)}
        noValidate
      >
        <VStack gap={5} align="stretch">
          <BankAccountSection
            selected={sections.bankAccount}
            setSelected={handleSetSelected('bankAccount')}
          />
          <CompanySection
            selected={sections.company}
            setSelected={handleSetSelected('company')}
          />
          <CarSection
            selected={sections.car}
            setSelected={handleSetSelected('car')}
          />
          <ValuablesSection
            selected={sections.valuables}
            setSelected={handleSetSelected('valuables')}
          />
          <OthersSection
            selected={sections.others}
            setSelected={handleSetSelected('others')}
          />

          <Button colorScheme="blue" type="submit">
            Uložit souhrn
          </Button>

          {summary && (
            <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="md" mb={4}>
                Souhrn majetku
              </Heading>
              <pre>{JSON.stringify(summary, null, 2)}</pre>
            </Box>
          )}
        </VStack>
      </Form>
    </Box>
  )
}

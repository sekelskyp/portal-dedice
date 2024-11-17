import React, { useState } from 'react'
import {
  Box,
  createListCollection,
  Heading,
  Separator,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { z } from 'zod'

import resources from '@frontend/resources'
import { Switch } from '@frontend/shared/design-system/atoms/chakra'
import { Form } from '@frontend/shared/forms/Form'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'
import { SubmitButton } from '@frontend/shared/forms/SubmitButton'

const assetSchema = (sections: Record<string, boolean>) => {
  const schema: Record<string, z.ZodObject<Record<string, z.ZodTypeAny>>> = {}
  if (!sections.bankAccount) {
    schema.bankAccount = z.object({
      bank: z
        .array(z.string({ required_error: 'Vyberte bankovní instituci' }))
        .min(1, { message: 'Vyberte alespoň jednu bankovní instituci' }),
    })
  }
  if (!sections.company) {
    schema.company = z.object({
      ico: z
        .string({ required_error: 'Zadejte IČO' })
        .min(1, { message: 'Zadejte IČO' })
        .regex(/^\d{8}$/, { message: 'Zadejte platné IČO (8 číslic)' }),
    })
  }
  if (!sections.car) {
    schema.car = z.object({
      brand: z.string({ required_error: 'Vyberte značku' }).min(1, {
        message: 'Vyberte značku',
      }),
      year: z
        .string({ required_error: 'Zadejte rok' })
        .min(1, { message: 'Zadejte rok' })
        .refine(
          (val) =>
            Number(val) >= 1900 && Number(val) <= new Date().getFullYear(),
          {
            message: 'Zadejte platný rok',
          }
        ),
      description: z
        .string({
          required_error: 'Zadejte popis zůstavitelova auta',
        })
        .min(1, { message: 'Zadejte popis zůstavitelova auta' }),
    })
  }
  if (!sections.valuables) {
    schema.valuables = z.object({
      description: z
        .string({
          required_error: 'Zadejte jaké cennosti zůstavitel vlastnil.',
        })
        .min(1, { message: 'Zadejte jaké cennosti zůstavitel vlastnil.' })
        .max(300, { message: 'Maximálně 300 znaků' }),
    })
  }
  if (!sections.others) {
    schema.others = z.object({
      description: z
        .string({ required_error: 'Zadejte co jiného zůstavitel vlastnil.' })
        .min(1, { message: 'Zadejte co jiného zůstavitel vlastnil.' })
        .max(300, { message: 'Maximálně 300 znaků' }),
    })
  }
  return z.object(schema)
}

const bankAccountCollection = createListCollection({
  items: [
    { value: 'Air Bank', label: 'Air Bank' },
    { value: 'Česká spořitelna', label: 'Česká spořitelna' },
    {
      value: 'Československá obchodní banka',
      label: 'Československá obchodní banka',
    },
    { value: 'Equa bank', label: 'Equa bank' },
    { value: 'Fio banka', label: 'Fio banka' },
    { value: 'Komerční banka', label: 'Komerční banka' },
    { value: 'mBank', label: 'mBank' },
    { value: 'Moneta Money Bank', label: 'Moneta Money Bank' },
    { value: 'Raiffeisenbank', label: 'Raiffeisenbank' },
    { value: 'Sberbank CZ', label: 'Sberbank CZ' },
    { value: 'UniCredit Bank', label: 'UniCredit Bank' },
  ],
})

const carBrandCollection = createListCollection({
  items: [
    { value: 'Škoda', label: 'Škoda' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Peugeot', label: 'Peugeot' },
    { value: 'Renault', label: 'Renault' },
    { value: 'Fiat', label: 'Fiat' },
    { value: 'Citroën', label: 'Citroën' },
    { value: 'Mazda', label: 'Mazda' },
    { value: 'Subaru', label: 'Subaru' },
    { value: 'Mitsubishi', label: 'Mitsubishi' },
    { value: 'Suzuki', label: 'Suzuki' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Jaguar', label: 'Jaguar' },
    { value: 'Land Rover', label: 'Land Rover' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Infiniti', label: 'Infiniti' },
    { value: 'Acura', label: 'Acura' },
    { value: 'Alfa Romeo', label: 'Alfa Romeo' },
    { value: 'Aston Martin', label: 'Aston Martin' },
    { value: 'Bentley', label: 'Bentley' },
    { value: 'Bugatti', label: 'Bugatti' },
    { value: 'Cadillac', label: 'Cadillac' },
    { value: 'Chrysler', label: 'Chrysler' },
    { value: 'Dodge', label: 'Dodge' },
    { value: 'Ferrari', label: 'Ferrari' },
    { value: 'Genesis', label: 'Genesis' },
    { value: 'GMC', label: 'GMC' },
    { value: 'Hummer', label: 'Hummer' },
    { value: 'Jeep', label: 'Jeep' },
    { value: 'Lamborghini', label: 'Lamborghini' },
    { value: 'Lincoln', label: 'Lincoln' },
    { value: 'Maserati', label: 'Maserati' },
    { value: 'McLaren', label: 'McLaren' },
    { value: 'Mini', label: 'Mini' },
    { value: 'Pagani', label: 'Pagani' },
    { value: 'Rolls-Royce', label: 'Rolls-Royce' },
    { value: 'Saab', label: 'Saab' },
    { value: 'Smart', label: 'Smart' },
    { value: 'Tata', label: 'Tata' },
    { value: 'Vauxhall', label: 'Vauxhall' },
  ],
})

interface SectionProps {
  title: string
  children: React.ReactNode
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  clearFields?: () => void
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  selected,
  setSelected,
  clearFields,
}) => (
  <Box>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Heading as={'h3'}>{title}</Heading>
    </Box>
    <Separator mb={2} />
    <Box p={1} m={2} display="flex" alignItems="center">
      <Box mr={2}>Ano</Box>
      <Switch
        checked={selected}
        onChange={() => {
          setSelected((prev) => !prev)
          if (!selected && clearFields) {
            clearFields()
          }
        }}
      />
      <Box ml={2}>Ne</Box>
    </Box>
    {!selected && children}
  </Box>
)

const BankAccountSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => {
  const { setValue } = useFormContext<AssetFormData>()

  const clearFields = () => {
    setValue('bankAccount.bank', [])
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.bankAccount}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <Controller
          name="bankAccount.bank"
          render={({ field }) => (
            <SelectFormControl
              {...field}
              label="Bankovní účet"
              collection={bankAccountCollection}
              placeholder="Vyberte bankovní instituci"
              multiple
            />
          )}
        />
      )}
    </Section>
  )
}

const CompanySection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => {
  const { setValue } = useFormContext<AssetFormData>()

  const clearFields = () => {
    setValue('company.ico', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.company}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <Controller
          name="company.ico"
          render={({ field }) => (
            <InputFormControl
              {...field}
              label="Obchodní společnost (IČO)"
              placeholder="Zadejte IČO"
            />
          )}
        />
      )}
    </Section>
  )
}

const CarSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => {
  const { setValue } = useFormContext<AssetFormData>()

  const clearFields = () => {
    setValue('car.brand', '')
    setValue('car.year', 0)
    setValue('car.description', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.car}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <>
          <Controller
            name="car.brand"
            render={({ field }) => (
              <SelectFormControl
                {...field}
                label="Auto"
                collection={carBrandCollection}
                placeholder="Vyberte značku auta"
              />
            )}
          />
          <Controller
            name="car.year"
            render={({ field }) => (
              <InputFormControl
                {...field}
                label="Rok registrace"
                type="number"
                placeholder="Zadejte rok registrace"
              />
            )}
          />
          <Controller
            name="car.description"
            render={({ field }) => (
              <InputFormControl
                {...field}
                label="Popis"
                placeholder="Zadejte popis auta"
              />
            )}
          />
        </>
      )}
    </Section>
  )
}

const ValuablesSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => {
  const { setValue } = useFormContext<AssetFormData>()

  const clearFields = () => {
    setValue('valuables.description', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.valuables}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <Controller
          name="valuables.description"
          render={({ field }) => (
            <InputFormControl
              {...field}
              placeholder="Zadejte jaké cennosti zůstavitel vlastnil (Max. 300 znaků)"
            />
          )}
        />
      )}
    </Section>
  )
}

const OthersSection: React.FC<{
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selected, setSelected }) => {
  const { setValue } = useFormContext<AssetFormData>()

  const clearFields = () => {
    setValue('others.description', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.others}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <Controller
          name="others.description"
          render={({ field }) => (
            <InputFormControl
              {...field}
              placeholder="Např. hotovost, nebo šperky, obrazy (max. 300 znaků)"
            />
          )}
        />
      )}
    </Section>
  )
}

export type AssetFormData = {
  bankAccount?: {
    bank?: string[]
  }
  company?: {
    ico?: string
  }
  car?: {
    brand?: string
    year?: number
    description?: string
  }
  valuables?: {
    description?: string
  }
  others?: {
    description?: string
  }
}

export type AssetSummary = {
  errorMessage?: string
  onSubmit: (variables: AssetFormData) => void
}


export const AssetForm: React.FC<{
  inheritanceProcedureId: number
  onSubmit: (data: AssetFormData) => void
}> = ({ inheritanceProcedureId, onSubmit }) => {
  const [sections, setSections] = useState({
    bankAccount: false,
    company: false,
    car: false,
    valuables: false,
    others: false,
  })

  const methods = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema(sections)),
  })

  const { setValue } = methods


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
      if (value) {
        setValue(section, {}, { shouldValidate: true })
      }
    }

  const handleSubmit: SubmitHandler<AssetFormData> = async (data) => {
    const filteredData: AssetFormData = Object.keys(data)
      .filter((key) => !sections[key as keyof typeof sections])
      .reduce(
        (acc, key) => ({ ...acc, [key]: data[key as keyof AssetFormData] }),
        {}
      )
    onSubmit(filteredData)
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit}
        resolver={zodResolver(assetSchema(sections))}
        noValidate
      >
        <VStack align="stretch">
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
          <SubmitButton type="submit" colorScheme="blue">
            Uložit majetek
          </SubmitButton>
        </VStack>
      </Form>
    </FormProvider>
  )
}

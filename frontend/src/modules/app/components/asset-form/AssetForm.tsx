import React from 'react'
import { VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@frontend/shared/forms/Form'
import { SubmitButton } from '@frontend/shared/forms/SubmitButton'

import { BankAccountSection } from './BankSection'
import { CarSection } from './CarSection'
import { CompanySection } from './CompanySection'
import { OthersSection } from './OthersSection'
import { useAssetSections } from './useAssetSections'
import { ValuablesSection } from './ValuablesSection'

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

export type AssetSummary = {
  errorMessage?: string
  onSubmit: (variables: AssetFormData) => void
}

export const AssetForm: React.FC<{
  inheritanceProcedureId: number
  onSubmit: (data: AssetFormData) => void
}> = ({ inheritanceProcedureId, onSubmit }) => {
  const { sections, handleSetSelected } = useAssetSections()

  const methods = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema(sections)),
  })

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
            bankAccountCollection={[]}          />
          <CompanySection
            selected={sections.company}
            setSelected={handleSetSelected('company')}
          />
          <CarSection
            selected={sections.car}
            setSelected={handleSetSelected('car')} 
            bankAccountCollection={[]}          />
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

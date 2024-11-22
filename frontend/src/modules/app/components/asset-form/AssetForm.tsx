import React, { useEffect } from 'react'
import { Grid, VStack } from '@chakra-ui/react'
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
  company?: Array<{
    ico?: string
  }>
  car?: Array<{
    brand?: string
    year?: number
    description?: string
  }>
  valuables?: {
    description?: string
  }
  others?: {
    description?: string
  }
}

const assetSchema = (sections: Record<string, boolean>) => {
  const schema: Record<string, z.ZodTypeAny> = {}

  if (!sections.bankAccount) {
    schema.bankAccount = z.object({
      bank: z
        .array(z.string())
        .min(1, { message: 'Vyberte alespoň jednu bankovní instituci' })
        .optional(),
    })
  }

  if (!sections.company) {
    schema.company = z
      .array(
        z.object({
          ico: z
            .string({ required_error: 'Zadejte IČO' })
            .min(1, { message: 'Zadejte IČO' })
            .regex(/^\d{8}$/, { message: 'Zadejte platné IČO (8 číslic)' }),
        })
      )
      .min(1, { message: 'Přidejte alespoň jednu společnost' })
  }

  if (!sections.car) {
    schema.car = z
      .array(
        z.object({
          brand: z.string({ required_error: 'Vyberte značku' }).min(1, {
            message: 'Vyberte značku',
          }),
          year: z
            .union([z.string(), z.number()])
            .transform((val) => val.toString())
            .refine(
              (val) => {
                const num = Number(val)
                return num >= 1900 && num <= new Date().getFullYear()
              },
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
      )
      .min(1, { message: 'Přidejte alespoň jedno auto' })
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
  defaultValues?: AssetFormData
  isSubmitting?: boolean
}> = React.memo(
  ({ inheritanceProcedureId, onSubmit, defaultValues, isSubmitting }) => {
    const { sections, handleSetSelected } = useAssetSections(defaultValues)

    const methods = useForm<AssetFormData>({
      resolver: zodResolver(assetSchema(sections)),
      defaultValues,
      mode: 'onChange',
    })

    useEffect(() => {
      if (defaultValues) {
        methods.reset(defaultValues)
        Object.entries(defaultValues).forEach(([key, value]) => {
          if (value && Object.keys(value).length > 0) {
            handleSetSelected(key as keyof typeof sections)(false)
          }
        })
      }
    }, [defaultValues, methods, handleSetSelected])

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
          defaultValues={defaultValues}
          noValidate
        >
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 12 }}
            width="100%"
            py={8}
          >
            <VStack gap={{ base: 6, md: 12 }} align="stretch">
              <CompanySection
                selected={sections.company}
                setSelected={handleSetSelected('company')}
              />
              <ValuablesSection
                selected={sections.valuables}
                setSelected={handleSetSelected('valuables')}
              />
              <OthersSection
                selected={sections.others}
                setSelected={handleSetSelected('others')}
              />
            </VStack>
            <VStack gap={{ base: 6, md: 12 }} align="stretch">
              <BankAccountSection
                selected={sections.bankAccount}
                setSelected={handleSetSelected('bankAccount')}
                bankAccountCollection={[]}
              />
              <CarSection
                selected={sections.car}
                setSelected={handleSetSelected('car')}
                bankAccountCollection={[]}
              />
            </VStack>

            <SubmitButton
              type="submit"
              colorScheme="blue"
              justifySelf={'center'}
              gridColumn={{ base: '1', md: 'span 2' }}
              width={{ base: '100%', sm: '50%' }}
              mt={8}
              loading={isSubmitting}
              loadingText="Ukládám majetek..."
            >
              Uložit majetek
            </SubmitButton>
          </Grid>
        </Form>
      </FormProvider>
    )
  }
)

AssetForm.displayName = 'AssetForm'

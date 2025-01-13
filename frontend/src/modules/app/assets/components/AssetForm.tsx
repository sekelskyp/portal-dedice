import React, { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@frontend/shared/forms/Form'
import { SubmitButton } from '@frontend/shared/forms/SubmitButton'

import { useAssetSections } from '../hooks/useAssetSections'

import { BankAccountSection } from './BankSection'
import { CarSection } from './CarSection'
import { CompanySection } from './CompanySection'
import { OthersSection } from './OthersSection'
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
      bank: z.array(z.string()).optional(),
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
  onSubmit: (data: AssetFormData) => Promise<void>
  defaultValues?: AssetFormData
  isEditMode?: boolean
}> = ({ inheritanceProcedureId, onSubmit, defaultValues, isEditMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { sections, visibleSections, handleSetSelected } =
    useAssetSections(defaultValues)

  const methods = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema(sections)),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues)
    }
  }, [defaultValues, methods])

  const handleSubmit: SubmitHandler<AssetFormData> = async (data) => {
    try {
      setIsSubmitting(true)
      const filteredData = {} as AssetFormData
      Object.entries(visibleSections).forEach(([key, isVisible]) => {
        const typedKey = key as keyof AssetFormData
        if (isVisible && data[typedKey]) {
          ;(filteredData[typedKey] as (typeof data)[typeof typedKey]) =
            data[typedKey]
        }
      })

      await onSubmit(filteredData)
      methods.reset(filteredData)
    } catch (error) {
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit}
        resolver={zodResolver(assetSchema(sections))}
        defaultValues={defaultValues}
        noValidate
      >
        <VStack width="100%" py={8} gap={{ base: 6, md: 12 }} align="stretch">
          <CompanySection
            selected={sections.company}
            setSelected={(value: boolean | ((prev: boolean) => boolean)) =>
              handleSetSelected('company')(
                typeof value === 'function' ? value(sections.company) : value
              )
            }
          />
          <BankAccountSection
            selected={sections.bankAccount}
            setSelected={(value: boolean | ((prev: boolean) => boolean)) =>
              handleSetSelected('bankAccount')(
                typeof value === 'function'
                  ? value(sections.bankAccount)
                  : value
              )
            }
            bankAccountCollection={[]}
          />
          <CarSection
            selected={sections.car}
            setSelected={(value: boolean | ((prev: boolean) => boolean)) =>
              handleSetSelected('car')(
                typeof value === 'function' ? value(sections.car) : value
              )
            }
            bankAccountCollection={[]}
          />
          <ValuablesSection
            selected={sections.valuables}
            setSelected={(value: boolean | ((prev: boolean) => boolean)) =>
              handleSetSelected('valuables')(
                typeof value === 'function' ? value(sections.valuables) : value
              )
            }
          />
          <OthersSection
            selected={sections.others}
            setSelected={(value: boolean | ((prev: boolean) => boolean)) =>
              handleSetSelected('others')(
                typeof value === 'function' ? value(sections.others) : value
              )
            }
          />

          <SubmitButton
            type="submit"
            colorScheme="blue"
            width={{ base: '100%', sm: '50%' }}
            alignSelf="center"
            mt={8}
            loading={isSubmitting}
            loadingText="Ukládám..."
          >
            {isEditMode ? 'Upravit majetek' : 'Uložit majetek'}
          </SubmitButton>
        </VStack>
      </Form>
    </FormProvider>
  )
}

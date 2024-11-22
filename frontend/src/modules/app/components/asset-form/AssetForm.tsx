import React, { useCallback, useMemo } from 'react'
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

const MemoizedCompanySection = React.memo(CompanySection)
const MemoizedValuablesSection = React.memo(ValuablesSection)
const MemoizedOthersSection = React.memo(OthersSection)
const MemoizedBankAccountSection = React.memo(BankAccountSection)
const MemoizedCarSection = React.memo(CarSection)

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
      resolver: useMemo(() => zodResolver(assetSchema(sections)), [sections]),
      defaultValues,
      mode: 'onChange',
      shouldUnregister: false,
      criteriaMode: 'firstError',
    })

    const values = methods.getValues()
    const filteredData = useMemo(() => {
      return Object.fromEntries(
        Object.entries(values).filter(
          ([key]) => !sections[key as keyof typeof sections]
        )
      )
    }, [sections, values])

    const handleSubmit = useCallback<SubmitHandler<AssetFormData>>(
      async (data) => {
        onSubmit(filteredData)
      },
      [filteredData, onSubmit]
    )

    const formSections = useMemo(
      () => ({
        company: (
          <MemoizedCompanySection
            selected={sections.company}
            setSelected={handleSetSelected('company')}
          />
        ),
        valuables: (
          <MemoizedValuablesSection
            selected={sections.valuables}
            setSelected={handleSetSelected('valuables')}
          />
        ),
        others: (
          <MemoizedOthersSection
            selected={sections.others}
            setSelected={handleSetSelected('others')}
          />
        ),
        bankAccount: (
          <MemoizedBankAccountSection
            selected={sections.bankAccount}
            setSelected={handleSetSelected('bankAccount')}
            bankAccountCollection={[]}
          />
        ),
        car: (
          <MemoizedCarSection
            selected={sections.car}
            setSelected={handleSetSelected('car')}
            bankAccountCollection={[]}
          />
        ),
      }),
      [sections, handleSetSelected]
    )

    return (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit}>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 12 }}
            width="100%"
            py={8}
          >
            <VStack gap={{ base: 6, md: 12 }} align="stretch">
              {formSections.company}
              {formSections.valuables}
              {formSections.others}
            </VStack>
            <VStack gap={{ base: 6, md: 12 }} align="stretch">
              {formSections.bankAccount}
              {formSections.car}
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

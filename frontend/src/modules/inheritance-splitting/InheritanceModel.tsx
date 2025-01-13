import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@frontend/shared/forms/Form'

import { InheritanceProgress } from './components/InheritanceProgress'
import { StepLayout } from './components/StepLayout'
import { WizardProvider } from './context/WizardContext'
import { Asset, FormData, Heir } from './data/FormData'
import { StepFour } from './steps/StepFour'
import { StepOne } from './steps/StepOne'
import { StepThree } from './steps/StepThree'
import { StepTwo } from './steps/StepTwo'

const assetSchema = z.object({
  heir: z.string().optional(),
  isShared: z.boolean(),
  name: z.string().optional(),
  type: z.string({ required_error: 'Typ je povinny udaj' }).min(1),
  value: z.string({ required_error: 'Hodnota je povinny udaj' }).min(1),
  sharedOwner: z.enum(['manžel/ka', 'pozůstalost']).optional(),
}) satisfies z.ZodType<Asset>

const heirSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'Label is required'),
  type: z
    .enum(['spouse', 'child', 'parent', 'sibling', 'cohabitant'])
    .optional(),
}) satisfies z.ZodType<Heir>

const stepOneSchema = z
  .object({
    hasChildren: z
      .string({ required_error: 'Prosím zvolte, zda má zůstavitel/ka potomky' })
      .min(1),
    childrenCount: z.string().optional(),
    hasSpouse: z
      .string({
        required_error: 'Prosím zvolte, zda má zůstavitel/ka manžela/ku',
      })
      .min(1),
    hasParents: z.string().min(1, 'This field is required').optional(),
    hasMother: z.boolean().optional(),
    hasFather: z.boolean().optional(),
    hasSiblings: z.string().min(1, 'This field is required').optional(),
    siblingsCount: z.string().optional(),
    hasLivedWithDeceased: z
      .string()
      .min(1, 'This field is required')
      .optional(),
    heirs: z.array(heirSchema).default([]).optional(),
    assets: z.array(assetSchema).default([]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasChildren === 'ano' && !data.childrenCount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Prosím vyberte počet dětí',
        path: ['childrenCount'],
      })
    }
    if (data.hasSpouse === 'ne') {
      if (!data.hasLivedWithDeceased) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Prosím zvolte jestli zůstavitel/ka s někým žila',
          path: ['hasLivedWithDeceased'],
        })
      } else if (!data.hasParents) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Prosím zvolte jestli zůstavitel/ka má rodiče',
          path: ['hasParents'],
        })
      } else if (data.hasParents === 'ne' && !data.hasSiblings) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Prosím vyberte jestli zůstavitel/ka má sourozence',
          path: ['hasSiblings'],
        })
      } else if (data.hasSiblings === 'ano' && !data.siblingsCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Prosím zvolte počet sourozenců',
          path: ['siblingsCount'],
        })
      }
    }
  }) satisfies z.ZodType<FormData>

const stepTwoSchema = z.object({
  assets: z.array(assetSchema).min(1, 'Přidejte alespoň jeden majetek'),
})

const InheritanceModel = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm<FormData>({
    defaultValues: {
      hasChildren: '',
      childrenCount: '',
      hasSpouse: '',
      hasParents: '',
      hasSiblings: '',
      siblingsCount: '',
      hasLivedWithDeceased: '',
      assets: [],
      heirs: [],
      hasMother: false,
      hasFather: false,
    },
    mode: 'onChange',
  })

  const stepTwoItems = [
    'Přidávejte položky majetku zůstavitele/ky pomocí ikony +',
    'Název položky majetku slouží k Vaší orientaci, nenípovinný',
    'V případě, že zůstavitel/ka má uzavřené manželství, je potřeba uvést též majetek pozůstalé/ho manžela/manželky,který spadá do SJM. Výlučný majetek pozůstalé/homanžela/manželky zde neuvádějte.',
    'SJM (Společné Jmění Manželů): v případě, že majetek nabyli manželé za trvání manželství, tak spadá do SJM. To platí i pro účty, které jsou vedené na jméno jednoho z manželů. Majetek nepatří do SJM pouze v případě, že jej zůstavitel/ka získal/a před uzavřením manželství, nebo během manželství např. darem, nebo dědictvím. Použijte pole ve sloupci SJM k určení či je položka výlučným majetkem zůstavitele/zůstavitelky.',
  ]

  const stepThreeItems = [
    'V prvním kroku je potřeba vypořádat SJM (Společné jmění manželů). Pozůstalý/á manžel/ka má nárok 1/2 hodnoty SJM. Druhá polovina se hodnotově musí objevit v pozůstalostním řízení. Součty hodnot jsou přehledně v níže uvedené části.',
    'Doporučujeme pozůstalé/mu manželce/manželovi přidělit primárně položky, které jsou již psané na její/jeho jméno. Tím se minimalizuje nutnost zařizovat přepis položek nového majitele.',
    'Doporučujeme sledovat sloupec “Dělitelnost” který indikuje, zda je položku vhodné dělit či nikoliv. Vysvětlivky naleznete přímo v záhlaví tohoto sloupce.',
    'Pro určení komu půjde majetek, využijte sloupec “Návrh na vypořádání SJM”. Pokud vyberete “manželka” znamená to, že položku z titulu vypořádání SJM přejde na ní. Zbylé položky automaticky přejou do pozůstalostního vypořádání.',
    'Jakmile máte vypořadné SJM, systém Vás automaticky pustí k pořádání pozůstalosti.',
    'Postupujte setejným způsobem, avšak za využití sloupce “Návrh vypořádání pozůstalosti”.',
    'Pokud některý z dědiců dostává více/méně, než kolik indikuje jeho zákonná část, tak to nevadí, pakliže s tím účastníci řízení souhlasí a je to jejich výslovné přání. Notář by měl takovou dohodu respektovat. Pro zcela spravedlivý výsledek je možné založit mezi dědici povinnosti vyplatit ostatní, tak aby každý dědic získal z pozůstalosti hodnotu, která mu náleží dle zákona. Viz poslední sloupec, kde je indikace kolik je částka výplaty a kdo jí činí.',
    'V pozůstalostním řízení samotném je ale možné aby k vyrovnávacím výplatám nedošlo, anebo aby nakonec měly i jinou částku, než jak je v této modelaci uvedeno. Opět, pokud je to přání dědiců a všichni s tím souhlasí, pak by měl notář takové dohodě vyhovět.',
  ]

  const formData = methods.watch()

  const onSubmit = (data: FormData) => {
    if (currentStep === 4) {
    } else if (currentStep === 2 && data.heirs?.length === 1) {
      setCurrentStep(4)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleNext = () => {
    methods.handleSubmit(onSubmit)()
  }

  return (
    <WizardProvider
      value={{
        formData,
        currentStep,
        setCurrentStep,
        formMethods: methods,
      }}
    >
      <FormProvider {...methods}>
        <Form
          onSubmit={onSubmit}
          resolver={zodResolver(
            currentStep === 1 ? stepOneSchema : stepTwoSchema
          )}
          noValidate
        >
          <InheritanceProgress currentStep={currentStep} />
          {currentStep === 1 && (
            <StepLayout
              title="Modelace vypořádání pozůstalosti"
              description="Tento nástroj slouží jako pomoc při přípravě na pozůstalostní řízení. Jedná se o modelaci vypořádání majetku v pozůstalosti dle zákonné posloupnosti. Nástroj není perfektní, ale pomůže Vám pochopit principy uvedené v zákoně. V případě, kdy je v pozůstalostním řízení závěť se zákonná posloupnost (tato modelace) pravděpodobně neuplatní. V každém případě Vás čeká schůzka s určeným notářem, který Vás konkrétním pozůstalostním řízením provede do detailu.
Vložené informace a data se nijak neukládají ani nezaznamenávají."
            >
              <StepOne onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
          {currentStep === 2 && (
            <StepLayout
              title="Stanovení majetku zůstavitele"
              description="Zadejte jednotlivé položky majetku zůstavitele"
              popoverTitle="Jak postupovat?"
              popoverItems={stepTwoItems}
            >
              <StepTwo onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
          {currentStep === 3 && (
            <StepLayout
              title="Návrh rozdělení majetku mezi dědice"
              description="Navrhněte rozdělení v souladu s pokyny níže."
              popoverTitle="Jak postupovat?"
              popoverItems={stepThreeItems}
            >
              <StepThree onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
          {currentStep === 4 && (
            <StepLayout
              title="Výsledek dědického řízení"
              description="Rekapitulace vypořádaní SJM a rozdělení pozůstalosti mezi dědice"
            >
              <StepFour onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
        </Form>
      </FormProvider>
    </WizardProvider>
  )
}

export default InheritanceModel

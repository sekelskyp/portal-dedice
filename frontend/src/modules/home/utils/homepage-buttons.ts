import { route } from '@shared/route'

export interface LandingPageFeature {
  id: number
  title: string
  text: string
  buttonText: string
  to: string
}

export const landingPageFeatures: LandingPageFeature[] = [
  {
    id: 1,
    title: 'Určení notáře',
    text: 'Zjistěte, který notář bude mít na starost dědické řízení po konkrétním zůstaviteli.',
    buttonText: 'Jdeme na to',
    to: route.wizard(),
  },
  {
    id: 2,
    title: 'Výpočet odměny',
    text: 'Pomocí naší kalkulačky a návodu zjistíte, kolik bude vyřízení pozůstalostního řízení stát.',
    buttonText: 'Registrace do portálu',
    to: route.signUp(),
  },
  {
    id: 3,
    title: 'Vypořádání pozůstalosti nanečisto',
    text: 'Nevíte, na jaký podíl z pozůstalosti máte ze zákona nárok? Naše aplikace Vám poradí nejen s určením výše podílu, ale pomůže namodelovat situaci přidáním konkrétních položek majetku, čímž uvidíte i nejen podíl, ale i částky, které budou dědit konkrétní dědicové.',
    buttonText: 'Vypořádání pozůstalosti nanečisto',
    to: route.inheritance(),
  },
]

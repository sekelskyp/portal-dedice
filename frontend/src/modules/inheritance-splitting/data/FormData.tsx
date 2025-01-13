export interface Asset {
  heir?: string
  isShared: boolean
  name?: string
  type: string
  value: string
  sharedOwner?: 'manžel/ka' | 'pozůstalost'
}

export interface Heir {
  id?: string
  label: string
  type?: 'spouse' | 'child' | 'parent' | 'sibling' | 'cohabitant'
}

export interface FormData {
  childrenCount?: string
  hasChildren: string
  hasSpouse: string
  hasParents?: string
  hasMother?: boolean
  hasFather?: boolean
  hasSiblings?: string
  siblingsCount?: string
  heirs?: Array<Heir>
  assets?: Array<Asset>
  hasLivedWithDeceased?: string
}

export interface StepProps {
  onPrevious: () => void
  onNext: () => void
}

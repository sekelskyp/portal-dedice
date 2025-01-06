export interface Asset {
  heir?: string
  isShared: boolean
  name: string
  type: string
  value: string
}

export interface Heir {
  id?: string
  label: string
  type?: 'spouse' | 'child' | 'parent' | 'sibling'
}

export interface FormData {
  childrenCount: string
  hasChildren: string
  hasSpouse: string
  hasParents: string
  hasSiblings: string
  siblingsCount: string
  heirs: Array<Heir>
  assets: Array<Asset>
}

export interface StepProps {
  onPrevious: () => void
  onNext: () => void
}

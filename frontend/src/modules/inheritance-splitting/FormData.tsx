export interface FormData {
  childrenCount: string
  hasChildren: string
  hasSpouse: string
  hasParents: string
  hasSiblings: string
  siblingsCount: string
  heirs: Array<{
    id: string
    type: 'spouse' | 'child' | 'parent' | 'sibling'
    label: string
  }>
  assets: Array<{
    type: string
    name: string
    value: string
    isShared: boolean
    heir?: string
  }>
}

// User Type
export const userTypeEnum = ['User', 'Notary', 'Admin'] as const
export type UserTypeEnumType = (typeof userTypeEnum)[number]

// Gender
export const genderEnum = ['Male', 'Female', 'Other'] as const
export type GenderEnumType = (typeof genderEnum)[number]

// Inheritance Procedure
export const proceedingStateEnum = ['InProgress', 'Closed'] as const
export type ProceedingStateEnumType = (typeof proceedingStateEnum)[number]

// Deceased Relation
export const deceasedRelationEnum = [
  'Spouse',
  'Child',
  'Parent',
  'Other',
] as const
export type DeceasedRelationEnumType = (typeof deceasedRelationEnum)[number]

// Asset Type
export const assetTypeEnum = [
  'Financial instrument',
  'Company',
  'Automobile',
  'Valuables',
  'Other',
] as const
export type AssetTypeEnumType = (typeof assetTypeEnum)[number]

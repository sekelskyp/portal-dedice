/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any }
}

export type Address = {
  __typename?: 'Address'
  id: Scalars['ID']['output']
  municipality: Scalars['String']['output']
  postalCode: Scalars['String']['output']
  street: Scalars['String']['output']
  streetNumber: Scalars['String']['output']
}

export type AddressInput = {
  municipality: Scalars['String']['input']
  postalCode: Scalars['String']['input']
  street: Scalars['String']['input']
  streetNumber: Scalars['String']['input']
}

export type Asset = {
  __typename?: 'Asset'
  bankName?: Maybe<Scalars['String']['output']>
  carMakeName?: Maybe<Scalars['String']['output']>
  carRegistrationDate?: Maybe<Scalars['DateTimeISO']['output']>
  carType?: Maybe<Scalars['String']['output']>
  cin?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  proceedingId: Scalars['ID']['output']
  type: Scalars['String']['output']
  value: Scalars['Float']['output']
}

export type AssetInput = {
  bankName?: InputMaybe<Scalars['String']['input']>
  carMakeName?: InputMaybe<Scalars['String']['input']>
  carRegistrationDate?: InputMaybe<Scalars['DateTimeISO']['input']>
  carType?: InputMaybe<Scalars['String']['input']>
  cin?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  proceedingId: Scalars['ID']['input']
  type: Scalars['String']['input']
  value: Scalars['Float']['input']
}

export type Beneficiary = {
  __typename?: 'Beneficiary'
  id: Scalars['ID']['output']
  proceedingId?: Maybe<Scalars['ID']['output']>
  user?: Maybe<User>
  userId: Scalars['ID']['output']
}

export type BeneficiaryInput = {
  proceedingId?: InputMaybe<Scalars['ID']['input']>
  userId: Scalars['ID']['input']
}

export type Chat = {
  __typename?: 'Chat'
  chatMessages?: Maybe<Array<ChatMessage>>
  id: Scalars['ID']['output']
  proceedingId: Scalars['ID']['output']
}

export type ChatMessage = {
  __typename?: 'ChatMessage'
  body: Scalars['String']['output']
  chatId: Scalars['ID']['output']
  createdAt: Scalars['DateTimeISO']['output']
  id: Scalars['ID']['output']
  userId: Scalars['ID']['output']
}

export type CreateNotaryInput = {
  postalCode?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type CreateProceedingInput = {
  beneficiaryUserIds: Array<Scalars['ID']['input']>
  deceasedPerson: DeceasedPersonInput
  mainBeneficiaryUserId: Scalars['ID']['input']
  startDate: Scalars['DateTimeISO']['input']
}

export type DeceasedPersonInput = {
  addressMunicipality: Scalars['String']['input']
  addressPostCode: Scalars['String']['input']
  addressStreet: Scalars['String']['input']
  addressStreetNumber: Scalars['String']['input']
  dateOfBirth: Scalars['DateTimeISO']['input']
  dateOfDeath: Scalars['DateTimeISO']['input']
  name: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type Document = {
  __typename?: 'Document'
  createDate: Scalars['DateTimeISO']['output']
  fileData: Scalars['String']['output']
  fileName: Scalars['String']['output']
  fileType: Scalars['String']['output']
  id: Scalars['ID']['output']
  proceedingId: Scalars['ID']['output']
}

export type FindNotaryInput = {
  addressPostCode: Scalars['String']['input']
  deceasedPersonDateOfDeath: Scalars['DateTimeISO']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  addBeneficiariesToProceeding: Scalars['Boolean']['output']
  addChatMessage: ChatMessage
  assignNotary: Scalars['Boolean']['output']
  changePassword: User
  closeProceeding: Scalars['Boolean']['output']
  confirmEmailVerification: Scalars['Boolean']['output']
  createAddress: Address
  createAsset: Asset
  createBeneficiaries: Array<Beneficiary>
  createBeneficiary: Beneficiary
  createDocument: Scalars['ID']['output']
  createNotary: Notary
  createProceeding: Scalars['Int']['output']
  deleteAddress: Scalars['Boolean']['output']
  deleteAsset: Scalars['Boolean']['output']
  deleteBeneficiaries: Scalars['Boolean']['output']
  deleteDocumentsByIds: Scalars['Boolean']['output']
  deleteNotary: Scalars['Boolean']['output']
  deleteProceedingsByIds: Scalars['Boolean']['output']
  notifyProcedureBeneficiaries: Scalars['Boolean']['output']
  removeBeneficiaryFromProceeding: Scalars['Boolean']['output']
  requestPasswordReset: Scalars['Boolean']['output']
  resetPassword: Scalars['Boolean']['output']
  signIn: SignInResponse
  signUp: User
  updateAddress?: Maybe<Address>
  updateAsset?: Maybe<Asset>
  updateBeneficiary: Beneficiary
  updateProfile: User
}

export type MutationAddBeneficiariesToProceedingArgs = {
  proceedingId: Scalars['Int']['input']
  userIds: Array<Scalars['Int']['input']>
}

export type MutationAddChatMessageArgs = {
  body: Scalars['String']['input']
  proceedingId: Scalars['Int']['input']
  userId: Scalars['Int']['input']
}

export type MutationAssignNotaryArgs = {
  proceedingId: Scalars['Int']['input']
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input']
  oldPassword: Scalars['String']['input']
}

export type MutationCloseProceedingArgs = {
  proceedingId: Scalars['Int']['input']
}

export type MutationConfirmEmailVerificationArgs = {
  token: Scalars['String']['input']
}

export type MutationCreateAddressArgs = {
  data: AddressInput
}

export type MutationCreateAssetArgs = {
  data: AssetInput
}

export type MutationCreateBeneficiariesArgs = {
  data: Array<BeneficiaryInput>
}

export type MutationCreateBeneficiaryArgs = {
  data: BeneficiaryInput
}

export type MutationCreateDocumentArgs = {
  data: UploadDocumentInput
}

export type MutationCreateNotaryArgs = {
  data: CreateNotaryInput
}

export type MutationCreateProceedingArgs = {
  data: CreateProceedingInput
}

export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteAssetArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteBeneficiariesArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteDocumentsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type MutationDeleteNotaryArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteProceedingsByIdsArgs = {
  ids: Array<Scalars['Int']['input']>
}

export type MutationNotifyProcedureBeneficiariesArgs = {
  html: Scalars['String']['input']
  proceedingId: Scalars['Int']['input']
  subject: Scalars['String']['input']
}

export type MutationRemoveBeneficiaryFromProceedingArgs = {
  beneficiaryId: Scalars['Int']['input']
  proceedingId: Scalars['Int']['input']
}

export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input']
}

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type MutationSignInArgs = {
  login: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationSignUpArgs = {
  registerInput: RegisterInput
}

export type MutationUpdateAddressArgs = {
  data: AddressInput
  id: Scalars['Int']['input']
}

export type MutationUpdateAssetArgs = {
  data: AssetInput
  id: Scalars['Int']['input']
}

export type MutationUpdateBeneficiaryArgs = {
  data: BeneficiaryInput
  id: Scalars['Int']['input']
}

export type MutationUpdateProfileArgs = {
  profileInput: ProfileInput
}

export type Notary = {
  __typename?: 'Notary'
  id: Scalars['ID']['output']
  postalCode?: Maybe<Scalars['String']['output']>
  user?: Maybe<User>
}

export type Proceeding = {
  __typename?: 'Proceeding'
  beneficiaries?: Maybe<Array<Beneficiary>>
  deceasedAddressId?: Maybe<Scalars['ID']['output']>
  deceasedDateOfBirth: Scalars['DateTimeISO']['output']
  deceasedDateOfDeath: Scalars['DateTimeISO']['output']
  deceasedDisplayName: Scalars['String']['output']
  deceasedName: Scalars['String']['output']
  documents: Array<Document>
  endDate?: Maybe<Scalars['DateTimeISO']['output']>
  id: Scalars['ID']['output']
  mainBeneficiary?: Maybe<Beneficiary>
  mainBeneficiaryId?: Maybe<Scalars['ID']['output']>
  name: Scalars['String']['output']
  notary?: Maybe<Notary>
  notaryId?: Maybe<Scalars['ID']['output']>
  procedureAssets?: Maybe<Array<Asset>>
  startDate: Scalars['DateTimeISO']['output']
  state: Scalars['String']['output']
}

export type ProfileInput = {
  displayName?: InputMaybe<Scalars['String']['input']>
  gender?: InputMaybe<Scalars['String']['input']>
  municipality?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  phone?: InputMaybe<Scalars['String']['input']>
  postalCode?: InputMaybe<Scalars['String']['input']>
  street?: InputMaybe<Scalars['String']['input']>
  streetNumber?: InputMaybe<Scalars['String']['input']>
  surname: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  _empty: Scalars['String']['output']
  chat: Chat
  chatByProceedingId: Chat
  findNotary?: Maybe<Notary>
  getAddressById?: Maybe<Address>
  getAllProceedings: Array<Proceeding>
  getAssetById?: Maybe<Asset>
  getAssetsByProceedingId: Array<Asset>
  getBeneficiariesByIds: Array<Beneficiary>
  getBeneficiariesByProceedingId: Array<Beneficiary>
  getBeneficiaryById?: Maybe<Beneficiary>
  getBeneficiaryProceedingsForUser: Array<Proceeding>
  getDocumentById?: Maybe<Document>
  getDocumentsByIds: Array<Document>
  getDocumentsByProceedingId: Array<Document>
  getNotaryById?: Maybe<Notary>
  getNotaryProceedingsForUser: Array<Proceeding>
  getProceedingById?: Maybe<Proceeding>
  getUserByEmail?: Maybe<User>
  getUserById?: Maybe<User>
  notaries: Array<Notary>
}

export type QueryChatArgs = {
  id: Scalars['Int']['input']
}

export type QueryChatByProceedingIdArgs = {
  proceedingId: Scalars['Int']['input']
}

export type QueryFindNotaryArgs = {
  input: FindNotaryInput
}

export type QueryGetAddressByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetAssetByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetAssetsByProceedingIdArgs = {
  proceedingId: Scalars['Int']['input']
}

export type QueryGetBeneficiariesByIdsArgs = {
  ids: Array<Scalars['Int']['input']>
}

export type QueryGetBeneficiariesByProceedingIdArgs = {
  proceedingId: Scalars['Int']['input']
}

export type QueryGetBeneficiaryByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetBeneficiaryProceedingsForUserArgs = {
  userId: Scalars['Int']['input']
}

export type QueryGetDocumentByIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetDocumentsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type QueryGetDocumentsByProceedingIdArgs = {
  proceedingId: Scalars['Int']['input']
}

export type QueryGetNotaryByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetNotaryProceedingsForUserArgs = {
  userId: Scalars['Int']['input']
}

export type QueryGetProceedingByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input']
}

export type QueryGetUserByIdArgs = {
  id: Scalars['Float']['input']
}

export type RegisterInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  password: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type SignInResponse = {
  __typename?: 'SignInResponse'
  token: Scalars['String']['output']
  user: User
}

export type Subscription = {
  __typename?: 'Subscription'
  newChatMessage: ChatMessage
}

export type SubscriptionNewChatMessageArgs = {
  procedureId: Scalars['Int']['input']
}

export type UploadDocumentInput = {
  file: Scalars['Upload']['input']
  inheritanceProcedureId: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  address?: Maybe<Address>
  addressId?: Maybe<Scalars['ID']['output']>
  confirmed: Scalars['Boolean']['output']
  displayName: Scalars['String']['output']
  email: Scalars['String']['output']
  gender?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  notaryId?: Maybe<Scalars['ID']['output']>
  password: Scalars['String']['output']
  phone?: Maybe<Scalars['String']['output']>
  sendNotifications: Scalars['Boolean']['output']
  surname: Scalars['String']['output']
  type: Scalars['String']['output']
}

export type AddMessageMutationVariables = Exact<{
  body: Scalars['String']['input']
  proceedingId: Scalars['Int']['input']
  userId: Scalars['Int']['input']
}>

export type AddMessageMutation = {
  __typename?: 'Mutation'
  addChatMessage: {
    __typename?: 'ChatMessage'
    chatId: string
    body: string
    userId: string
  }
}

export type GetChatQueryVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type GetChatQuery = {
  __typename?: 'Query'
  chatByProceedingId: {
    __typename?: 'Chat'
    chatMessages?: Array<{
      __typename?: 'ChatMessage'
      body: string
      chatId: string
      createdAt: any
      id: string
      userId: string
    }> | null
  }
}

export type NewChatMessageSubscriptionVariables = Exact<{
  procedureId: Scalars['Int']['input']
}>

export type NewChatMessageSubscription = {
  __typename?: 'Subscription'
  newChatMessage: {
    __typename?: 'ChatMessage'
    chatId: string
    body: string
    userId: string
    createdAt: any
    id: string
  }
}

export type GetBeneficiariesByProceedingIdQueryVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type GetBeneficiariesByProceedingIdQuery = {
  __typename?: 'Query'
  getBeneficiariesByProceedingId: Array<{
    __typename?: 'Beneficiary'
    userId: string
  }>
}

export type GetContactByIdQueryVariables = Exact<{
  id: Scalars['Float']['input']
}>

export type GetContactByIdQuery = {
  __typename?: 'Query'
  getUserById?: { __typename?: 'User'; displayName: string } | null
}

export type CreateAssetMutationVariables = Exact<{
  data: AssetInput
}>

export type CreateAssetMutation = {
  __typename?: 'Mutation'
  createAsset: {
    __typename?: 'Asset'
    id: string
    proceedingId: string
    type: string
    name: string
    value: number
    description?: string | null
    bankName?: string | null
    carMakeName?: string | null
    carRegistrationDate?: any | null
    carType?: string | null
    cin?: string | null
  }
}

export type UpdateAssetMutationVariables = Exact<{
  id: Scalars['Int']['input']
  data: AssetInput
}>

export type UpdateAssetMutation = {
  __typename?: 'Mutation'
  updateAsset?: {
    __typename?: 'Asset'
    id: string
    type: string
    name: string
    value: number
    description?: string | null
    bankName?: string | null
    carMakeName?: string | null
    carRegistrationDate?: any | null
    carType?: string | null
    cin?: string | null
  } | null
}

export type GetProceedingsByBeneficiaryIdQueryVariables = Exact<{
  userId: Scalars['Int']['input']
}>

export type GetProceedingsByBeneficiaryIdQuery = {
  __typename?: 'Query'
  getBeneficiaryProceedingsForUser: Array<{
    __typename?: 'Proceeding'
    id: string
    name: string
    startDate: any
    state: string
    deceasedDisplayName: string
  }>
}

export type CreateDocumentMutationVariables = Exact<{
  data: UploadDocumentInput
}>

export type CreateDocumentMutation = {
  __typename?: 'Mutation'
  createDocument: string
}

export type CreateProceedingMutationVariables = Exact<{
  data: CreateProceedingInput
}>

export type CreateProceedingMutation = {
  __typename?: 'Mutation'
  createProceeding: number
}

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type DeleteAssetMutation = {
  __typename?: 'Mutation'
  deleteAsset: boolean
}

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteDocumentMutation = {
  __typename?: 'Mutation'
  deleteDocumentsByIds: boolean
}

export type DeleteProceedingMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input']
}>

export type DeleteProceedingMutation = {
  __typename?: 'Mutation'
  deleteProceedingsByIds: boolean
}

export type GetDocumentByIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetDocumentByIdQuery = {
  __typename?: 'Query'
  getDocumentById?: {
    __typename?: 'Document'
    fileData: string
    fileType: string
    fileName: string
    createDate: any
  } | null
}

export type GetAssetsByProcedureIdQueryVariables = Exact<{
  procedureId: Scalars['Int']['input']
}>

export type GetAssetsByProcedureIdQuery = {
  __typename?: 'Query'
  getAssetsByProceedingId: Array<{
    __typename?: 'Asset'
    id: string
    proceedingId: string
    type: string
    name: string
    value: number
    description?: string | null
    bankName?: string | null
    carMakeName?: string | null
    carRegistrationDate?: any | null
    carType?: string | null
    cin?: string | null
  }>
}

export type GetDocumentsByProceedingIdQueryVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type GetDocumentsByProceedingIdQuery = {
  __typename?: 'Query'
  getDocumentsByProceedingId: Array<{
    __typename?: 'Document'
    id: string
    fileName: string
    createDate: any
    fileType: string
  }>
}

export type GetProceedingsByNotaryIdQueryVariables = Exact<{
  userId: Scalars['Int']['input']
}>

export type GetProceedingsByNotaryIdQuery = {
  __typename?: 'Query'
  getNotaryProceedingsForUser: Array<{
    __typename?: 'Proceeding'
    id: string
    name: string
    startDate: any
    state: string
    deceasedDisplayName: string
  }>
}

export type NotifyProcedureBeneficiariesMutationVariables = Exact<{
  html: Scalars['String']['input']
  subject: Scalars['String']['input']
  proceedingId: Scalars['Int']['input']
}>

export type NotifyProcedureBeneficiariesMutation = {
  __typename?: 'Mutation'
  notifyProcedureBeneficiaries: boolean
}

export type GetProceedingByIdQueryVariables = Exact<{
  getProceedingByIdId: Scalars['Int']['input']
}>

export type GetProceedingByIdQuery = {
  __typename?: 'Query'
  getProceedingById?: {
    __typename?: 'Proceeding'
    name: string
    deceasedDisplayName: string
    deceasedDateOfDeath: any
    deceasedDateOfBirth: any
    deceasedAddressId?: string | null
    id: string
    state: string
    notaryId?: string | null
    procedureAssets?: Array<{
      __typename?: 'Asset'
      id: string
      proceedingId: string
      value: number
      name: string
      description?: string | null
      type: string
      bankName?: string | null
      carMakeName?: string | null
      carRegistrationDate?: any | null
      carType?: string | null
      cin?: string | null
    }> | null
    mainBeneficiary?: {
      __typename?: 'Beneficiary'
      id: string
      user?: {
        __typename?: 'User'
        displayName: string
        email: string
        phone?: string | null
        id: string
        name: string
        surname: string
      } | null
    } | null
    beneficiaries?: Array<{
      __typename?: 'Beneficiary'
      id: string
      user?: {
        __typename?: 'User'
        displayName: string
        email: string
        phone?: string | null
        id: string
        name: string
        surname: string
      } | null
    }> | null
    documents: Array<{
      __typename?: 'Document'
      id: string
      fileData: string
      fileName: string
      fileType: string
      createDate: any
      proceedingId: string
    }>
    notary?: {
      __typename?: 'Notary'
      user?: {
        __typename?: 'User'
        displayName: string
        email: string
        name: string
        surname: string
        phone?: string | null
        id: string
        address?: {
          __typename?: 'Address'
          id: string
          street: string
          streetNumber: string
          municipality: string
          postalCode: string
        } | null
      } | null
    } | null
  } | null
}

export type GetUserByIdQueryVariables = Exact<{
  getUserByIdId: Scalars['Float']['input']
}>

export type GetUserByIdQuery = {
  __typename?: 'Query'
  getUserById?: {
    __typename?: 'User'
    address?: {
      __typename?: 'Address'
      municipality: string
      postalCode: string
      street: string
      streetNumber: string
    } | null
  } | null
}

export type UpdateProfileMutationVariables = Exact<{
  profileInput: ProfileInput
}>

export type UpdateProfileMutation = {
  __typename?: 'Mutation'
  updateProfile: {
    __typename?: 'User'
    name: string
    surname: string
    displayName: string
    email: string
    gender?: string | null
    phone?: string | null
    address?: {
      __typename?: 'Address'
      municipality: string
      postalCode: string
      street: string
      streetNumber: string
    } | null
  }
}

export type EmailVerificationMutationVariables = Exact<{
  token: Scalars['String']['input']
}>

export type EmailVerificationMutation = {
  __typename?: 'Mutation'
  confirmEmailVerification: boolean
}

export type SignInMutationVariables = Exact<{
  login: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type SignInMutation = {
  __typename?: 'Mutation'
  signIn: {
    __typename?: 'SignInResponse'
    token: string
    user: {
      __typename?: 'User'
      addressId?: string | null
      confirmed: boolean
      displayName: string
      email: string
      gender?: string | null
      id: string
      name: string
      phone?: string | null
      sendNotifications: boolean
      surname: string
      type: string
      address?: {
        __typename?: 'Address'
        id: string
        municipality: string
        postalCode: string
        street: string
        streetNumber: string
      } | null
    }
  }
}

export type SignUpMutationVariables = Exact<{
  registerInput: RegisterInput
}>

export type SignUpMutation = {
  __typename?: 'Mutation'
  signUp: { __typename?: 'User'; id: string }
}

export type FindNotaryQueryVariables = Exact<{
  input: FindNotaryInput
}>

export type FindNotaryQuery = {
  __typename?: 'Query'
  findNotary?: {
    __typename?: 'Notary'
    id: string
    user?: {
      __typename?: 'User'
      id: string
      name: string
      surname: string
      displayName: string
      email: string
      gender?: string | null
      phone?: string | null
      address?: {
        __typename?: 'Address'
        street: string
        streetNumber: string
        municipality: string
        postalCode: string
      } | null
    } | null
  } | null
}

export const AddMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addMessage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'body' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'proceedingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addChatMessage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'body' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'body' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proceedingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'chatId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddMessageMutation, AddMessageMutationVariables>
export const GetChatDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getChat' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'proceedingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'chatByProceedingId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proceedingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'chatMessages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'chatId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userId' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>
export const NewChatMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'newChatMessage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'procedureId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'newChatMessage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'procedureId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'procedureId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'chatId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NewChatMessageSubscription,
  NewChatMessageSubscriptionVariables
>
export const GetBeneficiariesByProceedingIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBeneficiariesByProceedingId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'proceedingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getBeneficiariesByProceedingId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proceedingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBeneficiariesByProceedingIdQuery,
  GetBeneficiariesByProceedingIdQueryVariables
>
export const GetContactByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetContactById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUserById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetContactByIdQuery, GetContactByIdQueryVariables>
export const CreateAssetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createAsset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AssetInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAsset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bankName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'carMakeName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'carRegistrationDate' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'carType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cin' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAssetMutation, CreateAssetMutationVariables>
export const UpdateAssetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAsset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AssetInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAsset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bankName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'carMakeName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'carRegistrationDate' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'carType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cin' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAssetMutation, UpdateAssetMutationVariables>
export const GetProceedingsByBeneficiaryIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProceedingsByBeneficiaryId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getBeneficiaryProceedingsForUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deceasedDisplayName' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProceedingsByBeneficiaryIdQuery,
  GetProceedingsByBeneficiaryIdQueryVariables
>
export const CreateDocumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateDocument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UploadDocumentInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createDocument' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDocumentMutation,
  CreateDocumentMutationVariables
>
export const CreateProceedingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createProceeding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateProceedingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProceeding' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateProceedingMutation,
  CreateProceedingMutationVariables
>
export const DeleteAssetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteAsset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteAsset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAssetMutation, DeleteAssetMutationVariables>
export const DeleteDocumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteDocument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteDocumentsByIds' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: {
                  kind: 'ListValue',
                  values: [
                    { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDocumentMutation,
  DeleteDocumentMutationVariables
>
export const DeleteProceedingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteProceeding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'Int' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteProceedingsByIds' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ids' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProceedingMutation,
  DeleteProceedingMutationVariables
>
export const GetDocumentByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDocumentById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getDocumentById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fileData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fileType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fileName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createDate' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDocumentByIdQuery,
  GetDocumentByIdQueryVariables
>
export const GetAssetsByProcedureIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAssetsByProcedureId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'procedureId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAssetsByProceedingId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proceedingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'procedureId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bankName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'carMakeName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'carRegistrationDate' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'carType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cin' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAssetsByProcedureIdQuery,
  GetAssetsByProcedureIdQueryVariables
>
export const GetDocumentsByProceedingIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDocumentsByProceedingId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'proceedingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getDocumentsByProceedingId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proceedingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fileName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fileType' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDocumentsByProceedingIdQuery,
  GetDocumentsByProceedingIdQueryVariables
>
export const GetProceedingsByNotaryIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProceedingsByNotaryId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getNotaryProceedingsForUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deceasedDisplayName' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProceedingsByNotaryIdQuery,
  GetProceedingsByNotaryIdQueryVariables
>
export const NotifyProcedureBeneficiariesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'NotifyProcedureBeneficiaries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'html' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'subject' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'proceedingId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'notifyProcedureBeneficiaries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'html' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'html' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'subject' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'subject' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proceedingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'proceedingId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotifyProcedureBeneficiariesMutation,
  NotifyProcedureBeneficiariesMutationVariables
>
export const GetProceedingByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProceedingById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getProceedingByIdId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProceedingById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getProceedingByIdId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'procedureAssets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proceedingId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bankName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'carMakeName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'carRegistrationDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'carType' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'cin' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'mainBeneficiary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'displayName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'phone' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'surname' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'beneficiaries' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'displayName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'phone' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'surname' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deceasedDisplayName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deceasedDateOfDeath' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deceasedDateOfBirth' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deceasedAddressId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'documents' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fileData' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fileName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fileType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proceedingId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notaryId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'street' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'streetNumber',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'municipality',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'postalCode' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'displayName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'surname' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'phone' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProceedingByIdQuery,
  GetProceedingByIdQueryVariables
>
export const GetUserByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getUserByIdId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUserById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getUserByIdId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'municipality' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'streetNumber' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>
export const UpdateProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'profileInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProfileInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'profileInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'profileInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'municipality' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'streetNumber' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>
export const EmailVerificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EmailVerification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmEmailVerification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EmailVerificationMutation,
  EmailVerificationMutationVariables
>
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'login' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'login' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'login' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addressId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'municipality' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'street' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'streetNumber' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'confirmed' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gender' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sendNotifications' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>
export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'registerInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'registerInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'registerInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>
export const FindNotaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FindNotary' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'FindNotaryInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findNotary' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gender' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'street' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'streetNumber' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'municipality' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindNotaryQuery, FindNotaryQueryVariables>

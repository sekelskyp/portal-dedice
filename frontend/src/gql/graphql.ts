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

export type AddressSuggestion = {
  __typename?: 'AddressSuggestion'
  municipality: Scalars['String']['output']
  postalCode: Scalars['String']['output']
  street: Scalars['String']['output']
  streetNumber: Scalars['String']['output']
}

export type Article = {
  __typename?: 'Article'
  attachment?: Maybe<Attachment>
  content: Scalars['String']['output']
  coverImageAttachmentId?: Maybe<Scalars['ID']['output']>
  date: Scalars['DateTimeISO']['output']
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
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

export type Attachment = {
  __typename?: 'Attachment'
  fileUuid: Scalars['String']['output']
  filename: Scalars['String']['output']
  id: Scalars['ID']['output']
  mimetype: Scalars['String']['output']
  proceedingId?: Maybe<Scalars['ID']['output']>
  uploadDate: Scalars['DateTimeISO']['output']
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
  displayName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  userId: Scalars['ID']['output']
}

export type CreateArticleInput = {
  content: Scalars['String']['input']
  coverImage: Scalars['Upload']['input']
  date: Scalars['DateTimeISO']['input']
  title: Scalars['String']['input']
}

export type CreateNotaryInput = {
  postalCode?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type CreateProceedingInput = {
  beneficiaryUserIds: Array<Scalars['ID']['input']>
  deceasedPerson: DeceasedPersonInput
  mainBeneficiaryUserId?: InputMaybe<Scalars['ID']['input']>
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>
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

export type FindNotaryInput = {
  addressPostCode: Scalars['String']['input']
  deceasedPersonDateOfDeath: Scalars['DateTimeISO']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  addBeneficiariesToProceeding: Array<Beneficiary>
  addChatMessage: ChatMessage
  assignMainBeneficiary: Scalars['Boolean']['output']
  assignNotary: Scalars['Boolean']['output']
  changePassword: Scalars['Boolean']['output']
  closeProceeding: Scalars['Boolean']['output']
  confirmEmailVerification: Scalars['Boolean']['output']
  createAddress: Address
  createArticle: Article
  createAsset: Asset
  createBeneficiaries: Array<Beneficiary>
  createBeneficiary: Beneficiary
  createNotary: Notary
  createNotaryDateRule: NotaryDateRule
  createProceeding: Scalars['Int']['output']
  deleteAddress: Scalars['Boolean']['output']
  deleteArticles: Scalars['Boolean']['output']
  deleteAsset: Scalars['Boolean']['output']
  deleteAttachmentsByIds: Scalars['Boolean']['output']
  deleteBeneficiaries: Scalars['Boolean']['output']
  deleteNotary: Scalars['Boolean']['output']
  deleteNotaryDateRules: Scalars['Boolean']['output']
  deleteProceedingsByIds: Scalars['Boolean']['output']
  notifyProcedureBeneficiaries: Scalars['Boolean']['output']
  removeBeneficiaryFromProceeding: Scalars['Boolean']['output']
  removeMainBeneficiary: Scalars['Boolean']['output']
  requestPasswordReset: Scalars['Boolean']['output']
  resetPassword: Scalars['Boolean']['output']
  signIn: SignInResponse
  signUp: User
  toggleUserConfirmation: User
  updateAddress?: Maybe<Address>
  updateArticle?: Maybe<Article>
  updateAsset?: Maybe<Asset>
  updateBeneficiary: Beneficiary
  updateName: Scalars['Boolean']['output']
  updateNotaryDateRule?: Maybe<NotaryDateRule>
  updateProfile: User
  updateSendNotifications: User
  uploadAttachmentToProceeding: Scalars['ID']['output']
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

export type MutationAssignMainBeneficiaryArgs = {
  beneficiaryId: Scalars['Int']['input']
  proceedingId: Scalars['Int']['input']
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

export type MutationCreateArticleArgs = {
  data: CreateArticleInput
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

export type MutationCreateNotaryArgs = {
  data: CreateNotaryInput
}

export type MutationCreateNotaryDateRuleArgs = {
  data: NotaryDateRuleInput
}

export type MutationCreateProceedingArgs = {
  data: CreateProceedingInput
}

export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteArticlesArgs = {
  ids: Array<Scalars['Int']['input']>
}

export type MutationDeleteAssetArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteAttachmentsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type MutationDeleteBeneficiariesArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteNotaryArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteNotaryDateRulesArgs = {
  ids: Scalars['Int']['input']
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

export type MutationRemoveMainBeneficiaryArgs = {
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

export type MutationToggleUserConfirmationArgs = {
  userId: Scalars['Float']['input']
}

export type MutationUpdateAddressArgs = {
  data: AddressInput
  id: Scalars['Int']['input']
}

export type MutationUpdateArticleArgs = {
  data: UpdateArticleInput
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

export type MutationUpdateNameArgs = {
  name: Scalars['String']['input']
  proceedingId: Scalars['Int']['input']
}

export type MutationUpdateNotaryDateRuleArgs = {
  data: NotaryDateRuleInput
  id: Scalars['Int']['input']
}

export type MutationUpdateProfileArgs = {
  profileInput: ProfileInput
}

export type MutationUpdateSendNotificationsArgs = {
  sendNotifications: Scalars['Boolean']['input']
}

export type MutationUploadAttachmentToProceedingArgs = {
  data: UploadFileToProceedingInput
}

export type Notary = {
  __typename?: 'Notary'
  id: Scalars['ID']['output']
  postalCode?: Maybe<Scalars['String']['output']>
  user?: Maybe<User>
}

export type NotaryDateRule = {
  __typename?: 'NotaryDateRule'
  endDay: Scalars['Float']['output']
  endMonth: Scalars['Float']['output']
  id: Scalars['ID']['output']
  notaryId: Scalars['ID']['output']
  startDay: Scalars['Float']['output']
  startMonth: Scalars['Float']['output']
}

export type NotaryDateRuleInput = {
  endDay: Scalars['Float']['input']
  endMonth: Scalars['Float']['input']
  notaryId: Scalars['ID']['input']
  startDay: Scalars['Float']['input']
  startMonth: Scalars['Float']['input']
}

export type Proceeding = {
  __typename?: 'Proceeding'
  beneficiaries?: Maybe<Array<Beneficiary>>
  deceasedAddress?: Maybe<Address>
  deceasedAddressId?: Maybe<Scalars['ID']['output']>
  deceasedDateOfBirth: Scalars['DateTimeISO']['output']
  deceasedDateOfDeath: Scalars['DateTimeISO']['output']
  deceasedDisplayName: Scalars['String']['output']
  deceasedName: Scalars['String']['output']
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
  addressInput?: InputMaybe<AddressInput>
  displayName?: InputMaybe<Scalars['String']['input']>
  gender?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  sendNotifications?: InputMaybe<Scalars['Boolean']['input']>
  surname?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  _empty: Scalars['String']['output']
  chat: Chat
  chatByProceedingId: Chat
  findNotary?: Maybe<Notary>
  getAddressById?: Maybe<Address>
  getAddressSuggestions: Array<AddressSuggestion>
  getAllArticles: Array<Article>
  getAllProceedings: Array<Proceeding>
  getAllUserByType?: Maybe<Array<User>>
  getAllUsers: Array<User>
  getArticleById?: Maybe<Article>
  getAssetById?: Maybe<Asset>
  getAssetsByProceedingId: Array<Asset>
  getAttachmentById?: Maybe<Attachment>
  getAttachmentsByIds: Array<Attachment>
  getAttachmentsByProceedingId: Array<Attachment>
  getBeneficiariesByIds: Array<Beneficiary>
  getBeneficiariesByProceedingId: Array<Beneficiary>
  getBeneficiaryById?: Maybe<Beneficiary>
  getBeneficiaryProceedingsForUser: Array<Proceeding>
  getNotaryById?: Maybe<Notary>
  getNotaryDateRuleById?: Maybe<NotaryDateRule>
  getNotaryDateRulesByNotary: Array<NotaryDateRule>
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

export type QueryGetAddressSuggestionsArgs = {
  query: Scalars['String']['input']
}

export type QueryGetAllUserByTypeArgs = {
  type: Scalars['String']['input']
}

export type QueryGetArticleByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetAssetByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetAssetsByProceedingIdArgs = {
  proceedingId: Scalars['Int']['input']
}

export type QueryGetAttachmentByIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetAttachmentsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type QueryGetAttachmentsByProceedingIdArgs = {
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

export type QueryGetNotaryByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetNotaryDateRuleByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetNotaryDateRulesByNotaryArgs = {
  notaryId: Scalars['Int']['input']
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
  proceedingId: Scalars['Int']['input']
}

export type UpdateArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>
  coverImage?: InputMaybe<Scalars['Upload']['input']>
  date?: InputMaybe<Scalars['DateTimeISO']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type UploadFileToProceedingInput = {
  file: Scalars['Upload']['input']
  proceedingId: Scalars['ID']['input']
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

export type ChangeUserStatusMutationVariables = Exact<{
  userId: Scalars['Float']['input']
}>

export type ChangeUserStatusMutation = {
  __typename?: 'Mutation'
  toggleUserConfirmation: { __typename?: 'User'; confirmed: boolean }
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  __typename?: 'Query'
  getAllUsers: Array<{
    __typename?: 'User'
    id: string
    name: string
    surname: string
    displayName: string
    addressId?: string | null
    type: string
    confirmed: boolean
    notaryId?: string | null
    address?: {
      __typename?: 'Address'
      id: string
      municipality: string
      postalCode: string
      street: string
      streetNumber: string
    } | null
  }>
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

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type DeleteAssetMutation = {
  __typename?: 'Mutation'
  deleteAsset: boolean
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

export type GetBeneficiaryGroupsQueryVariables = Exact<{
  userId: Scalars['Int']['input']
}>

export type GetBeneficiaryGroupsQuery = {
  __typename?: 'Query'
  getBeneficiaryProceedingsForUser: Array<{
    __typename?: 'Proceeding'
    id: string
    name: string
    state: string
  }>
}

export type GetNotaryGroupsQueryVariables = Exact<{
  userId: Scalars['Int']['input']
}>

export type GetNotaryGroupsQuery = {
  __typename?: 'Query'
  getNotaryProceedingsForUser: Array<{
    __typename?: 'Proceeding'
    id: string
    name: string
    state: string
  }>
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

export type ChatByProceedingIdQueryVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type ChatByProceedingIdQuery = {
  __typename?: 'Query'
  chatByProceedingId: {
    __typename?: 'Chat'
    chatMessages?: Array<{
      __typename?: 'ChatMessage'
      body: string
      chatId: string
      createdAt: any
      displayName?: string | null
      id: string
      userId: string
    }> | null
  }
}

export type NewChatMessageSubscriptionVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type NewChatMessageSubscription = {
  __typename?: 'Subscription'
  newChatMessage: {
    __typename?: 'ChatMessage'
    body: string
    chatId: string
    createdAt: any
    displayName?: string | null
    id: string
    userId: string
  }
}

export type GetChatHeaderQueryVariables = Exact<{
  getProceedingByIdId: Scalars['Int']['input']
}>

export type GetChatHeaderQuery = {
  __typename?: 'Query'
  getProceedingById?: {
    __typename?: 'Proceeding'
    name: string
    beneficiaries?: Array<{
      __typename?: 'Beneficiary'
      user?: { __typename?: 'User'; displayName: string; id: string } | null
    }> | null
    notary?: {
      __typename?: 'Notary'
      user?: { __typename?: 'User'; displayName: string; id: string } | null
    } | null
  } | null
}

export type DeleteAttachmentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteAttachmentMutation = {
  __typename?: 'Mutation'
  deleteAttachmentsByIds: boolean
}

export type GetAttachmentsByProceedingIdQueryVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type GetAttachmentsByProceedingIdQuery = {
  __typename?: 'Query'
  getAttachmentsByProceedingId: Array<{
    __typename?: 'Attachment'
    fileUuid: string
    filename: string
    id: string
    mimetype: string
    uploadDate: any
  }>
}

export type UploadDocumentMutationVariables = Exact<{
  data: UploadFileToProceedingInput
}>

export type UploadDocumentMutation = {
  __typename?: 'Mutation'
  uploadAttachmentToProceeding: string
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

export type CreateProceedingMutationVariables = Exact<{
  data: CreateProceedingInput
}>

export type CreateProceedingMutation = {
  __typename?: 'Mutation'
  createProceeding: number
}

export type DeleteProceedingMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input']
}>

export type DeleteProceedingMutation = {
  __typename?: 'Mutation'
  deleteProceedingsByIds: boolean
}

export type GetAllProceedingsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllProceedingsQuery = {
  __typename?: 'Query'
  getAllProceedings: Array<{
    __typename?: 'Proceeding'
    id: string
    name: string
    startDate: any
    state: string
    deceasedDisplayName: string
  }>
}

export type GetAllUsersQueryVariables = Exact<{
  type: Scalars['String']['input']
}>

export type GetAllUsersQuery = {
  __typename?: 'Query'
  getAllUserByType?: Array<{
    __typename?: 'User'
    id: string
    name: string
    surname: string
    displayName: string
  }> | null
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
        id: string
        displayName: string
        email: string
        phone?: string | null
        name: string
        surname: string
        confirmed: boolean
        type: string
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
        confirmed: boolean
        type: string
      } | null
    }> | null
    deceasedAddress?: {
      __typename?: 'Address'
      id: string
      street: string
      streetNumber: string
      municipality: string
      postalCode: string
    } | null
    notary?: {
      __typename?: 'Notary'
      id: string
      user?: {
        __typename?: 'User'
        displayName: string
        email: string
        name: string
        surname: string
        phone?: string | null
        id: string
        confirmed: boolean
        type: string
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

export type RemoveBeneficiaryFromProceedingMutationVariables = Exact<{
  beneficiaryId: Scalars['Int']['input']
  proceedingId: Scalars['Int']['input']
}>

export type RemoveBeneficiaryFromProceedingMutation = {
  __typename?: 'Mutation'
  removeBeneficiaryFromProceeding: boolean
}

export type AddBeneficiariesToProceedingMutationVariables = Exact<{
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input']
  proceedingId: Scalars['Int']['input']
}>

export type AddBeneficiariesToProceedingMutation = {
  __typename?: 'Mutation'
  addBeneficiariesToProceeding: Array<{
    __typename?: 'Beneficiary'
    id: string
    user?: {
      __typename?: 'User'
      id: string
      displayName: string
      email: string
      phone?: string | null
      name: string
      surname: string
      confirmed: boolean
      type: string
    } | null
  }>
}

export type RemoveMainBeneficiaryMutationVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type RemoveMainBeneficiaryMutation = {
  __typename?: 'Mutation'
  removeMainBeneficiary: boolean
}

export type AssignMainBeneficiaryMutationVariables = Exact<{
  beneficiaryId: Scalars['Int']['input']
  proceedingId: Scalars['Int']['input']
}>

export type AssignMainBeneficiaryMutation = {
  __typename?: 'Mutation'
  assignMainBeneficiary: boolean
}

export type UpdateProceedingNameMutationVariables = Exact<{
  name: Scalars['String']['input']
  proceedingId: Scalars['Int']['input']
}>

export type UpdateProceedingNameMutation = {
  __typename?: 'Mutation'
  updateName: boolean
}

export type CloseProceedingMutationVariables = Exact<{
  proceedingId: Scalars['Int']['input']
}>

export type CloseProceedingMutation = {
  __typename?: 'Mutation'
  closeProceeding: boolean
}

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input']
  oldPassword: Scalars['String']['input']
}>

export type ChangePasswordMutation = {
  __typename?: 'Mutation'
  changePassword: boolean
}

export type GetNotaryDateRulesQueryVariables = Exact<{
  notaryId: Scalars['Int']['input']
}>

export type GetNotaryDateRulesQuery = {
  __typename?: 'Query'
  getNotaryDateRulesByNotary: Array<{
    __typename?: 'NotaryDateRule'
    id: string
    startDay: number
    startMonth: number
    endDay: number
    endMonth: number
  }>
}

export type GetNotaryAddressRulesQueryVariables = Exact<{
  getNotaryByIdId: Scalars['Int']['input']
}>

export type GetNotaryAddressRulesQuery = {
  __typename?: 'Query'
  getNotaryById?: { __typename?: 'Notary'; postalCode?: string | null } | null
}

export type GetUserByIdQueryVariables = Exact<{
  getUserByIdId: Scalars['Float']['input']
}>

export type GetUserByIdQuery = {
  __typename?: 'Query'
  getUserById?: {
    __typename?: 'User'
    id: string
    email: string
    password: string
    confirmed: boolean
    type: string
    notaryId?: string | null
    sendNotifications: boolean
    name: string
    surname: string
    displayName: string
    gender?: string | null
    phone?: string | null
    addressId?: string | null
    address?: {
      __typename?: 'Address'
      id: string
      street: string
      streetNumber: string
      municipality: string
      postalCode: string
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
    id: string
    email: string
    password: string
    confirmed: boolean
    type: string
    notaryId?: string | null
    sendNotifications: boolean
    name: string
    surname: string
    displayName: string
    gender?: string | null
    phone?: string | null
    addressId?: string | null
    address?: {
      __typename?: 'Address'
      id: string
      street: string
      streetNumber: string
      municipality: string
      postalCode: string
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

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input']
}>

export type RequestPasswordResetMutation = {
  __typename?: 'Mutation'
  requestPasswordReset: boolean
}

export type XddMutationVariables = Exact<{
  newPassword: Scalars['String']['input']
  token: Scalars['String']['input']
}>

export type XddMutation = { __typename?: 'Mutation'; resetPassword: boolean }

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
      notaryId?: string | null
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

export type CreateArticleMutationVariables = Exact<{
  data: CreateArticleInput
}>

export type CreateArticleMutation = {
  __typename?: 'Mutation'
  createArticle: { __typename?: 'Article'; id: string }
}

export type DeleteArticleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input']
}>

export type DeleteArticleMutation = {
  __typename?: 'Mutation'
  deleteArticles: boolean
}

export type GetArticleByIdQueryVariables = Exact<{
  getArticleByIdId: Scalars['Int']['input']
}>

export type GetArticleByIdQuery = {
  __typename?: 'Query'
  getArticleById?: {
    __typename?: 'Article'
    id: string
    date: any
    title: string
    content: string
    coverImageAttachmentId?: string | null
    attachment?: {
      __typename?: 'Attachment'
      id: string
      fileUuid: string
      mimetype: string
    } | null
  } | null
}

export type GetAllArticlesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllArticlesQuery = {
  __typename?: 'Query'
  getAllArticles: Array<{
    __typename?: 'Article'
    id: string
    date: any
    title: string
    content: string
    coverImageAttachmentId?: string | null
    attachment?: {
      __typename?: 'Attachment'
      id: string
      fileUuid: string
      mimetype: string
    } | null
  }>
}

export type UpdateArticleMutationVariables = Exact<{
  data: UpdateArticleInput
  updateArticleId: Scalars['Int']['input']
}>

export type UpdateArticleMutation = {
  __typename?: 'Mutation'
  updateArticle?: { __typename?: 'Article'; id: string } | null
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

export type GetAddressSuggestionsQueryVariables = Exact<{
  query: Scalars['String']['input']
}>

export type GetAddressSuggestionsQuery = {
  __typename?: 'Query'
  getAddressSuggestions: Array<{
    __typename?: 'AddressSuggestion'
    street: string
    streetNumber: string
    municipality: string
    postalCode: string
  }>
}

export const ChangeUserStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeUserStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
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
            name: { kind: 'Name', value: 'toggleUserConfirmation' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeUserStatusMutation,
  ChangeUserStatusMutationVariables
>
export const GetUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllUsers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notaryId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>
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
export const GetBeneficiaryGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBeneficiaryGroups' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBeneficiaryGroupsQuery,
  GetBeneficiaryGroupsQueryVariables
>
export const GetNotaryGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNotaryGroups' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetNotaryGroupsQuery,
  GetNotaryGroupsQueryVariables
>
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
export const ChatByProceedingIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ChatByProceedingId' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
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
} as unknown as DocumentNode<
  ChatByProceedingIdQuery,
  ChatByProceedingIdQueryVariables
>
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
            name: { kind: 'Name', value: 'newChatMessage' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chatId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
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
export const GetChatHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetChatHeader' },
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
                  name: { kind: 'Name', value: 'beneficiaries' },
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
                              name: { kind: 'Name', value: 'displayName' },
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
                              name: { kind: 'Name', value: 'displayName' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetChatHeaderQuery, GetChatHeaderQueryVariables>
export const DeleteAttachmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteAttachment' },
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
            name: { kind: 'Name', value: 'deleteAttachmentsByIds' },
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
  DeleteAttachmentMutation,
  DeleteAttachmentMutationVariables
>
export const GetAttachmentsByProceedingIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAttachmentsByProceedingId' },
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
            name: { kind: 'Name', value: 'getAttachmentsByProceedingId' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'fileUuid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mimetype' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uploadDate' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAttachmentsByProceedingIdQuery,
  GetAttachmentsByProceedingIdQueryVariables
>
export const UploadDocumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UploadDocument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UploadFileToProceedingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadAttachmentToProceeding' },
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
  UploadDocumentMutation,
  UploadDocumentMutationVariables
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
export const GetAllProceedingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllProceedings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllProceedings' },
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
  GetAllProceedingsQuery,
  GetAllProceedingsQueryVariables
>
export const GetAllUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
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
            name: { kind: 'Name', value: 'getAllUserByType' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'type' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>
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
                              name: { kind: 'Name', value: 'id' },
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
                              name: { kind: 'Name', value: 'phone' },
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
                              name: { kind: 'Name', value: 'confirmed' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'confirmed' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
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
                  name: { kind: 'Name', value: 'deceasedAddress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notaryId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notary' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'confirmed' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
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
export const RemoveBeneficiaryFromProceedingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveBeneficiaryFromProceeding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'beneficiaryId' },
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
            name: { kind: 'Name', value: 'removeBeneficiaryFromProceeding' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'beneficiaryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'beneficiaryId' },
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
  RemoveBeneficiaryFromProceedingMutation,
  RemoveBeneficiaryFromProceedingMutationVariables
>
export const AddBeneficiariesToProceedingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddBeneficiariesToProceeding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userIds' },
          },
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
            name: { kind: 'Name', value: 'addBeneficiariesToProceeding' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userIds' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'confirmed' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
  AddBeneficiariesToProceedingMutation,
  AddBeneficiariesToProceedingMutationVariables
>
export const RemoveMainBeneficiaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveMainBeneficiary' },
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
            name: { kind: 'Name', value: 'removeMainBeneficiary' },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveMainBeneficiaryMutation,
  RemoveMainBeneficiaryMutationVariables
>
export const AssignMainBeneficiaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AssignMainBeneficiary' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'beneficiaryId' },
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
            name: { kind: 'Name', value: 'assignMainBeneficiary' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'beneficiaryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'beneficiaryId' },
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
  AssignMainBeneficiaryMutation,
  AssignMainBeneficiaryMutationVariables
>
export const UpdateProceedingNameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProceedingName' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
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
            name: { kind: 'Name', value: 'updateName' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
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
  UpdateProceedingNameMutation,
  UpdateProceedingNameMutationVariables
>
export const CloseProceedingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CloseProceeding' },
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
            name: { kind: 'Name', value: 'closeProceeding' },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CloseProceedingMutation,
  CloseProceedingMutationVariables
>
export const ChangePasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'newPassword' },
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
            name: { kind: 'Name', value: 'oldPassword' },
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
            name: { kind: 'Name', value: 'changePassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'newPassword' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'oldPassword' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'oldPassword' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>
export const GetNotaryDateRulesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNotaryDateRules' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notaryId' },
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
            name: { kind: 'Name', value: 'getNotaryDateRulesByNotary' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notaryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notaryId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startMonth' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endMonth' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetNotaryDateRulesQuery,
  GetNotaryDateRulesQueryVariables
>
export const GetNotaryAddressRulesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNotaryAddressRules' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getNotaryByIdId' },
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
            name: { kind: 'Name', value: 'getNotaryById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getNotaryByIdId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetNotaryAddressRulesQuery,
  GetNotaryAddressRulesQueryVariables
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notaryId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sendNotifications' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confirmed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notaryId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sendNotifications' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
export const RequestPasswordResetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestPasswordReset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
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
            name: { kind: 'Name', value: 'requestPasswordReset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables
>
export const XddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'xdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'newPassword' },
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
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'newPassword' },
                },
              },
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
} as unknown as DocumentNode<XddMutation, XddMutationVariables>
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'notaryId' },
                      },
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
export const CreateArticleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateArticle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateArticleInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createArticle' },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateArticleMutation,
  CreateArticleMutationVariables
>
export const DeleteArticleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteArticle' },
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
            name: { kind: 'Name', value: 'deleteArticles' },
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
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>
export const GetArticleByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetArticleById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getArticleByIdId' },
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
            name: { kind: 'Name', value: 'getArticleById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getArticleByIdId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coverImageAttachmentId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attachment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fileUuid' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mimetype' },
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
} as unknown as DocumentNode<GetArticleByIdQuery, GetArticleByIdQueryVariables>
export const GetAllArticlesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllArticles' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllArticles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coverImageAttachmentId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attachment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fileUuid' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mimetype' },
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
} as unknown as DocumentNode<GetAllArticlesQuery, GetAllArticlesQueryVariables>
export const UpdateArticleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateArticle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateArticleInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateArticleId' },
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
            name: { kind: 'Name', value: 'updateArticle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateArticleId' },
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
} as unknown as DocumentNode<
  UpdateArticleMutation,
  UpdateArticleMutationVariables
>
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
export const GetAddressSuggestionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAddressSuggestions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'query' },
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
            name: { kind: 'Name', value: 'getAddressSuggestions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'query' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'query' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'street' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'streetNumber' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'municipality' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAddressSuggestionsQuery,
  GetAddressSuggestionsQueryVariables
>

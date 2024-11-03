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
}

export type Asset = {
  __typename?: 'Asset'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  inheritanceProcedureId: Scalars['ID']['output']
  name: Scalars['String']['output']
  value: Scalars['Float']['output']
}

export type Beneficiary = {
  __typename?: 'Beneficiary'
  contact?: Maybe<Contact>
  contactId?: Maybe<Scalars['ID']['output']>
  dateOfBirth?: Maybe<Scalars['DateTimeISO']['output']>
  deceasedRelation?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  inheritanceProcedures: Array<InheritanceProcedure>
  user?: Maybe<User>
  userId?: Maybe<Scalars['ID']['output']>
}

export type BeneficiaryInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type Contact = {
  __typename?: 'Contact'
  completeAddress?: Maybe<Scalars['String']['output']>
  displayName?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  gender?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  phone?: Maybe<Scalars['String']['output']>
  postalCode?: Maybe<Scalars['String']['output']>
  surname: Scalars['String']['output']
}

export type ContactPersonInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type CreateBeneficiaryInput = {
  contactId?: InputMaybe<Scalars['ID']['input']>
  dateOfBirth?: InputMaybe<Scalars['DateTimeISO']['input']>
  deceasedRelation?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type CreateContactInput = {
  completeAddress?: InputMaybe<Scalars['String']['input']>
  displayName?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  gender?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  phone?: InputMaybe<Scalars['String']['input']>
  postalCode?: InputMaybe<Scalars['String']['input']>
  surname: Scalars['String']['input']
}

export type CreateInheritanceProcedureInput = {
  deceasedContactId: Scalars['ID']['input']
  deceasedDateOfBirth?: InputMaybe<Scalars['DateTimeISO']['input']>
  deceasedDateOfDeath?: InputMaybe<Scalars['DateTimeISO']['input']>
  endDate: Scalars['DateTimeISO']['input']
  mainContactId?: InputMaybe<Scalars['ID']['input']>
  name: Scalars['String']['input']
  notaryId?: InputMaybe<Scalars['ID']['input']>
  startDate: Scalars['DateTimeISO']['input']
  state?: InputMaybe<Scalars['String']['input']>
}

export type CreateNotaryInput = {
  contactId?: InputMaybe<Scalars['ID']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type DeceasedPersonInput = {
  completeAddress: Scalars['String']['input']
  dateOfBirth: Scalars['DateTimeISO']['input']
  dateOfDeath: Scalars['DateTimeISO']['input']
  name: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type FindNotaryInput = {
  deceasedPersonDateOfDeath: Scalars['DateTimeISO']['input']
  postalCode: Scalars['String']['input']
}

export type InheritanceProcedure = {
  __typename?: 'InheritanceProcedure'
  beneficiaries?: Maybe<Array<Beneficiary>>
  deceasedContact?: Maybe<Contact>
  deceasedContactId?: Maybe<Scalars['ID']['output']>
  deceasedDateOfBirth?: Maybe<Scalars['DateTimeISO']['output']>
  deceasedDateOfDeath?: Maybe<Scalars['DateTimeISO']['output']>
  endDate?: Maybe<Scalars['DateTimeISO']['output']>
  id: Scalars['ID']['output']
  mainContact?: Maybe<Contact>
  mainContactId?: Maybe<Scalars['Float']['output']>
  name: Scalars['String']['output']
  notary?: Maybe<Notary>
  notaryId?: Maybe<Scalars['ID']['output']>
  procedureAssets?: Maybe<Array<Asset>>
  startDate: Scalars['DateTimeISO']['output']
  state: Scalars['String']['output']
}

export type InheritanceProcedureFormDataInput = {
  beneficiaries: Array<BeneficiaryInput>
  beneficiaryId: Scalars['Float']['input']
  contactPerson: ContactPersonInput
  deceasedPerson: DeceasedPersonInput
}

export type Mutation = {
  __typename?: 'Mutation'
  addBeneficiariesToProcedure: Scalars['Boolean']['output']
  addBeneficiaryToProcedure: Scalars['Boolean']['output']
  assignNotary: Scalars['Boolean']['output']
  changePassword: User
  closeProcedure: Scalars['Boolean']['output']
  confirmEmailVerification: Scalars['Boolean']['output']
  createBeneficiaries: Array<Beneficiary>
  createBeneficiary: Beneficiary
  createContact: Scalars['Int']['output']
  createInheritanceProcedureFromForm: InheritanceProcedure
  createNotary: Notary
  createProcedure: Scalars['Int']['output']
  deleteBeneficiary: Scalars['Boolean']['output']
  deleteContactById: Scalars['Int']['output']
  deleteNotary: Notary
  removeBeneficiaryFromProcedure: Scalars['Boolean']['output']
  requestPasswordReset: Scalars['Boolean']['output']
  resetPassword: Scalars['Boolean']['output']
  signIn: SignInResponse
  signUp: User
  updateBeneficiary: Beneficiary
}

export type MutationAddBeneficiariesToProcedureArgs = {
  beneficiaryIds: Array<Scalars['Int']['input']>
  procedureId: Scalars['Int']['input']
}

export type MutationAddBeneficiaryToProcedureArgs = {
  beneficiaryId: Scalars['Int']['input']
  procedureId: Scalars['Int']['input']
}

export type MutationAssignNotaryArgs = {
  notaryId: Scalars['Int']['input']
  procedureId: Scalars['Int']['input']
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input']
  oldPassword: Scalars['String']['input']
}

export type MutationCloseProcedureArgs = {
  procedureId: Scalars['Int']['input']
}

export type MutationConfirmEmailVerificationArgs = {
  token: Scalars['String']['input']
}

export type MutationCreateBeneficiariesArgs = {
  data: Array<CreateBeneficiaryInput>
}

export type MutationCreateBeneficiaryArgs = {
  data: CreateBeneficiaryInput
}

export type MutationCreateContactArgs = {
  data: CreateContactInput
}

export type MutationCreateInheritanceProcedureFromFormArgs = {
  data: InheritanceProcedureFormDataInput
}

export type MutationCreateNotaryArgs = {
  data: CreateNotaryInput
}

export type MutationCreateProcedureArgs = {
  data: CreateInheritanceProcedureInput
}

export type MutationDeleteBeneficiaryArgs = {
  id: Scalars['Int']['input']
}

export type MutationDeleteContactByIdArgs = {
  id: Scalars['Float']['input']
}

export type MutationDeleteNotaryArgs = {
  id: Scalars['Float']['input']
}

export type MutationRemoveBeneficiaryFromProcedureArgs = {
  beneficiaryId: Scalars['Int']['input']
  procedureId: Scalars['Int']['input']
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

export type MutationUpdateBeneficiaryArgs = {
  data: UpdateBeneficiaryInput
  id: Scalars['Int']['input']
}

export type Notary = {
  __typename?: 'Notary'
  contact?: Maybe<Contact>
  contactId?: Maybe<Scalars['ID']['output']>
  id: Scalars['ID']['output']
  inheritanceProcedures: Array<InheritanceProcedure>
  user?: Maybe<User>
  userId?: Maybe<Scalars['ID']['output']>
}

export type Query = {
  __typename?: 'Query'
  _empty: Scalars['String']['output']
  author?: Maybe<Notary>
  findNotary?: Maybe<Notary>
  getAllContacts: Array<Contact>
  getBeneficiariesByIds: Array<Beneficiary>
  getBeneficiariesByProcedureId: Array<Beneficiary>
  getBeneficiaryById?: Maybe<Beneficiary>
  getContactById?: Maybe<Contact>
  getProcedureById?: Maybe<InheritanceProcedure>
  getProceduresByBeneficiaryId: Array<InheritanceProcedure>
  getProceduresByNotaryId: Array<InheritanceProcedure>
  getUserById?: Maybe<User>
  notaries: Array<Notary>
}

export type QueryAuthorArgs = {
  id: Scalars['Float']['input']
}

export type QueryFindNotaryArgs = {
  input: FindNotaryInput
}

export type QueryGetBeneficiariesByIdsArgs = {
  ids: Array<Scalars['Int']['input']>
}

export type QueryGetBeneficiariesByProcedureIdArgs = {
  procedureId: Scalars['Int']['input']
}

export type QueryGetBeneficiaryByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetContactByIdArgs = {
  id: Scalars['Float']['input']
}

export type QueryGetProcedureByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetProceduresByBeneficiaryIdArgs = {
  beneficiaryId: Scalars['Int']['input']
}

export type QueryGetProceduresByNotaryIdArgs = {
  notaryId: Scalars['Int']['input']
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

export type UpdateBeneficiaryInput = {
  contactId?: InputMaybe<Scalars['ID']['input']>
  dateOfBirth?: InputMaybe<Scalars['DateTimeISO']['input']>
  deceasedRelation?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type User = {
  __typename?: 'User'
  beneficiaries: Array<Beneficiary>
  confirmed: Scalars['Boolean']['output']
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  isBeneficiary: Scalars['Boolean']['output']
  isNotary: Scalars['Boolean']['output']
  notaries: Array<Notary>
  password: Scalars['String']['output']
}

export type GetProceduresByBeneficiaryIdQueryVariables = Exact<{
  beneficiaryId: Scalars['Int']['input']
}>

export type GetProceduresByBeneficiaryIdQuery = {
  __typename?: 'Query'
  getProceduresByBeneficiaryId: Array<{
    __typename?: 'InheritanceProcedure'
    id: string
    name: string
    startDate: any
    state: string
  }>
}

export type GetProceduresByNotaryIdQueryVariables = Exact<{
  notaryId: Scalars['Int']['input']
}>

export type GetProceduresByNotaryIdQuery = {
  __typename?: 'Query'
  getProceduresByNotaryId: Array<{
    __typename?: 'InheritanceProcedure'
    id: string
    name: string
    startDate: any
    state: string
  }>
}

export type GetProcedureByIdQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetProcedureByIdQuery = {
  __typename?: 'Query'
  getProcedureById?: {
    __typename?: 'InheritanceProcedure'
    id: string
    name: string
    state: string
    mainContact?: {
      __typename?: 'Contact'
      id: string
      name: string
      surname: string
      displayName?: string | null
      gender?: string | null
      phone?: string | null
      email?: string | null
      completeAddress?: string | null
      postalCode?: string | null
    } | null
    beneficiaries?: Array<{
      __typename?: 'Beneficiary'
      id: string
      userId?: string | null
      contactId?: string | null
      deceasedRelation?: string | null
      user?: { __typename?: 'User'; id: string; email: string } | null
      contact?: {
        __typename?: 'Contact'
        id: string
        email?: string | null
        name: string
        surname: string
      } | null
    }> | null
    procedureAssets?: Array<{
      __typename?: 'Asset'
      id: string
      name: string
      value: number
    }> | null
  } | null
}

export type CreateProcedureMutationVariables = Exact<{
  data: InheritanceProcedureFormDataInput
}>

export type CreateProcedureMutation = {
  __typename?: 'Mutation'
  createInheritanceProcedureFromForm: {
    __typename?: 'InheritanceProcedure'
    id: string
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
      id: string
      email: string
      confirmed: boolean
      isNotary: boolean
      isBeneficiary: boolean
      beneficiaries: Array<{
        __typename?: 'Beneficiary'
        id: string
        dateOfBirth?: any | null
        deceasedRelation?: string | null
        userId?: string | null
        contactId?: string | null
      }>
      notaries: Array<{
        __typename?: 'Notary'
        contactId?: string | null
        id: string
        userId?: string | null
      }>
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
    contact?: {
      __typename?: 'Contact'
      id: string
      name: string
      surname: string
      displayName?: string | null
      completeAddress?: string | null
      email?: string | null
      gender?: string | null
      postalCode?: string | null
      phone?: string | null
    } | null
  } | null
}

export const GetProceduresByBeneficiaryIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProceduresByBeneficiaryId' },
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
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProceduresByBeneficiaryId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'beneficiaryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'beneficiaryId' },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProceduresByBeneficiaryIdQuery,
  GetProceduresByBeneficiaryIdQueryVariables
>
export const GetProceduresByNotaryIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProceduresByNotaryId' },
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
            name: { kind: 'Name', value: 'getProceduresByNotaryId' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProceduresByNotaryIdQuery,
  GetProceduresByNotaryIdQueryVariables
>
export const GetProcedureByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProcedureById' },
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
            name: { kind: 'Name', value: 'getProcedureById' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'mainContact' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gender' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'completeAddress' },
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
                  name: { kind: 'Name', value: 'beneficiaries' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userId' },
                      },
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
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contactId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contact' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
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
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deceasedRelation' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'procedureAssets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProcedureByIdQuery,
  GetProcedureByIdQueryVariables
>
export const CreateProcedureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createProcedure' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'InheritanceProcedureFormDataInput',
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
            name: { kind: 'Name', value: 'createInheritanceProcedureFromForm' },
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
  CreateProcedureMutation,
  CreateProcedureMutationVariables
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
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'confirmed' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isNotary' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isBeneficiary' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'beneficiaries' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'dateOfBirth' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'deceasedRelation' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'userId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactId' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'notaries' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contact' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'completeAddress' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gender' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gender' },
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

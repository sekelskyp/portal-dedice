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

export type Beneficiary = {
  __typename?: 'Beneficiary'
  contact?: Maybe<Contact>
  contactId?: Maybe<Scalars['ID']['output']>
  dateOfBirth?: Maybe<Scalars['DateTimeISO']['output']>
  deceasedRelation?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  user?: Maybe<User>
  userId?: Maybe<Scalars['ID']['output']>
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
  deceasedPersonId?: InputMaybe<Scalars['ID']['input']>
  endDate: Scalars['DateTimeISO']['input']
  name: Scalars['String']['input']
  notaryId?: InputMaybe<Scalars['ID']['input']>
  startDate: Scalars['DateTimeISO']['input']
  state?: InputMaybe<Scalars['String']['input']>
}

export type CreateNotaryInput = {
  contactId?: InputMaybe<Scalars['ID']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type DeceasedPerson = {
  __typename?: 'DeceasedPerson'
  contactId: Scalars['ID']['output']
  dateOfBirth: Scalars['DateTimeISO']['output']
  dateOfDeath: Scalars['DateTimeISO']['output']
  id: Scalars['Int']['output']
}

export type FindNotaryInput = {
  deceasedPersonDateOfDeath: Scalars['DateTimeISO']['input']
  postalCode: Scalars['String']['input']
}

export type InheritanceProcedure = {
  __typename?: 'InheritanceProcedure'
  deceasedPerson?: Maybe<DeceasedPerson>
  deceasedPersonId?: Maybe<Scalars['ID']['output']>
  endDate?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  notary?: Maybe<Notary>
  notaryId?: Maybe<Scalars['ID']['output']>
  startDate: Scalars['DateTimeISO']['output']
  state: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  addBeneficiaryToProcedure: Scalars['Boolean']['output']
  assignNotary: Scalars['Boolean']['output']
  changePassword: User
  closeProcedure: Scalars['Boolean']['output']
  confirmEmailVerification: Scalars['Boolean']['output']
  createBeneficiaries: Array<Beneficiary>
  createBeneficiary: Beneficiary
  createContact: Scalars['Int']['output']
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
  beneficiary?: Maybe<Beneficiary>
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  notary?: Maybe<Notary>
  password: Scalars['String']['output']
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
    user: { __typename?: 'User'; id: string; email: string }
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

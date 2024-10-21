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

export type AddressInput = {
  postalCode: Scalars['String']['input']
}

export type AuthInfo = {
  __typename?: 'AuthInfo'
  token: Scalars['String']['output']
  user: User
}

export type ChangePassword = {
  __typename?: 'ChangePassword'
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type Contact = {
  __typename?: 'Contact'
  city: Scalars['String']['output']
  country: Scalars['String']['output']
  dateOfBirth: Scalars['DateTimeISO']['output']
  email: Scalars['String']['output']
  gender: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  phone?: Maybe<Scalars['String']['output']>
  postalCode: Scalars['String']['output']
  street: Scalars['String']['output']
  surname: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword: ChangePassword
  requestPasswordReset: Scalars['Boolean']['output']
  signIn: AuthInfo
  signUp: AuthInfo
  updateUserProfile: UserProfile
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input']
  oldPassword: Scalars['String']['input']
}

export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input']
}

export type MutationSignInArgs = {
  login: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationSignUpArgs = {
  registerInput: RegisterInput
}

export type MutationUpdateUserProfileArgs = {
  name: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type Notary = {
  __typename?: 'Notary'
  contact: Contact
  id: Scalars['Float']['output']
}

export type Query = {
  __typename?: 'Query'
  _empty: Scalars['String']['output']
  getNotaryByAddressAndBirthDate?: Maybe<Notary>
  user?: Maybe<User>
  users: Array<User>
}

export type QueryGetNotaryByAddressAndBirthDateArgs = {
  address: AddressInput
  expirationDate: Scalars['DateTimeISO']['input']
}

export type QueryUserArgs = {
  id: Scalars['String']['input']
}

export type RegisterContactInput = {
  city: Scalars['String']['input']
  country: Scalars['String']['input']
  dateOfBirth: Scalars['DateTimeISO']['input']
  email: Scalars['String']['input']
  gender: Scalars['String']['input']
  name: Scalars['String']['input']
  phone: Scalars['String']['input']
  postalCode: Scalars['String']['input']
  street: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type RegisterInput = {
  contact: RegisterContactInput
  login: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type User = {
  __typename?: 'User'
  contactId: Scalars['ID']['output']
  id: Scalars['ID']['output']
  login: Scalars['String']['output']
  password: Scalars['String']['output']
}

export type UserProfile = {
  __typename?: 'UserProfile'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  surName: Scalars['String']['output']
}

export type SignInMutationVariables = Exact<{
  login: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type SignInMutation = {
  __typename?: 'Mutation'
  signIn: {
    __typename?: 'AuthInfo'
    token: string
    user: { __typename?: 'User'; id: string; login: string }
  }
}

export type SignUpMutationVariables = Exact<{
  registerInput: RegisterInput
}>

export type SignUpMutation = {
  __typename?: 'Mutation'
  signUp: {
    __typename?: 'AuthInfo'
    token: string
    user: { __typename?: 'User'; id: string; login: string }
  }
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
                      { kind: 'Field', name: { kind: 'Name', value: 'login' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'login' } },
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
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>

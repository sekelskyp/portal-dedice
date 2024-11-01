/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation createProcedure($data: CreateInheritanceProcedureInput!) {\n    createProcedure(data: $data)\n  }\n':
    types.CreateProcedureDocument,
  '\n  mutation EmailVerification($token: String!) {\n    confirmEmailVerification(token: $token)\n  }\n':
    types.EmailVerificationDocument,
  '\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        id\n        email\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp($registerInput: RegisterInput!) {\n    signUp(registerInput: $registerInput) {\n      id\n    }\n  }\n':
    types.SignUpDocument,
  '\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      contact {\n        id\n        name\n        surname\n        displayName\n        completeAddress\n        email\n        gender\n        postalCode\n        phone\n      }\n    }\n  }\n':
    types.FindNotaryDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createProcedure($data: CreateInheritanceProcedureInput!) {\n    createProcedure(data: $data)\n  }\n'
): (typeof documents)['\n  mutation createProcedure($data: CreateInheritanceProcedureInput!) {\n    createProcedure(data: $data)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EmailVerification($token: String!) {\n    confirmEmailVerification(token: $token)\n  }\n'
): (typeof documents)['\n  mutation EmailVerification($token: String!) {\n    confirmEmailVerification(token: $token)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        id\n        email\n      }\n      token\n    }\n  }\n'
): (typeof documents)['\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        id\n        email\n      }\n      token\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignUp($registerInput: RegisterInput!) {\n    signUp(registerInput: $registerInput) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation SignUp($registerInput: RegisterInput!) {\n    signUp(registerInput: $registerInput) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      contact {\n        id\n        name\n        surname\n        displayName\n        completeAddress\n        email\n        gender\n        postalCode\n        phone\n      }\n    }\n  }\n'
): (typeof documents)['\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      contact {\n        id\n        name\n        surname\n        displayName\n        completeAddress\n        email\n        gender\n        postalCode\n        phone\n      }\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never

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
  '\n  query GetProceduresByBeneficiaryId($beneficiaryId: Int!) {\n    getProceduresByBeneficiaryId(beneficiaryId: $beneficiaryId) {\n      id\n      name\n      startDate\n      state\n      deceasedContact {\n        displayName\n      }\n    }\n  }\n':
    types.GetProceduresByBeneficiaryIdDocument,
  '\n  query GetAllProcedures {\n    getAllProcedures {\n      id\n      name\n      startDate\n      state\n      deceasedContact {\n        displayName\n      }\n    }\n  }\n':
    types.GetAllProceduresDocument,
  '\n  query GetProcedureById($id: Int!) {\n    getProcedureById(id: $id) {\n      id\n      name\n      notary {\n        id\n        contact {\n          id\n          name\n          surname\n          email\n        }\n      }\n      mainContact {\n        id\n        name\n        surname\n        displayName\n        gender\n        phone\n        email\n        completeAddress\n        postalCode\n      }\n      beneficiaries {\n        id\n        userId\n        user {\n          id\n          email\n        }\n        contactId\n        contact {\n          id\n          email\n          name\n          surname\n        }\n        deceasedRelation\n      }\n      procedureAssets {\n        id\n        name\n        value\n      }\n      state\n    }\n  }\n':
    types.GetProcedureByIdDocument,
  '\n  mutation createProcedure($data: InheritanceProcedureFormDataInput!) {\n    createInheritanceProcedureFromForm(data: $data) {\n      id\n    }\n  }\n':
    types.CreateProcedureDocument,
  '\n  mutation EmailVerification($token: String!) {\n    confirmEmailVerification(token: $token)\n  }\n':
    types.EmailVerificationDocument,
  '\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        id\n        email\n        confirmed\n        isNotary\n        isBeneficiary\n        beneficiaries {\n          id\n          dateOfBirth\n          deceasedRelation\n          userId\n          contactId\n        }\n        notaries {\n          contactId\n          id\n          userId\n        }\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp($registerInput: RegisterInput!) {\n    signUp(registerInput: $registerInput) {\n      id\n    }\n  }\n':
    types.SignUpDocument,
  '\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      contact {\n        id\n        name\n        surname\n        displayName\n        completeAddress\n        email\n        gender\n        postalCode\n        phone\n        email\n        gender\n      }\n    }\n  }\n':
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
  source: '\n  query GetProceduresByBeneficiaryId($beneficiaryId: Int!) {\n    getProceduresByBeneficiaryId(beneficiaryId: $beneficiaryId) {\n      id\n      name\n      startDate\n      state\n      deceasedContact {\n        displayName\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProceduresByBeneficiaryId($beneficiaryId: Int!) {\n    getProceduresByBeneficiaryId(beneficiaryId: $beneficiaryId) {\n      id\n      name\n      startDate\n      state\n      deceasedContact {\n        displayName\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllProcedures {\n    getAllProcedures {\n      id\n      name\n      startDate\n      state\n      deceasedContact {\n        displayName\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllProcedures {\n    getAllProcedures {\n      id\n      name\n      startDate\n      state\n      deceasedContact {\n        displayName\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProcedureById($id: Int!) {\n    getProcedureById(id: $id) {\n      id\n      name\n      notary {\n        id\n        contact {\n          id\n          name\n          surname\n          email\n        }\n      }\n      mainContact {\n        id\n        name\n        surname\n        displayName\n        gender\n        phone\n        email\n        completeAddress\n        postalCode\n      }\n      beneficiaries {\n        id\n        userId\n        user {\n          id\n          email\n        }\n        contactId\n        contact {\n          id\n          email\n          name\n          surname\n        }\n        deceasedRelation\n      }\n      procedureAssets {\n        id\n        name\n        value\n      }\n      state\n    }\n  }\n'
): (typeof documents)['\n  query GetProcedureById($id: Int!) {\n    getProcedureById(id: $id) {\n      id\n      name\n      notary {\n        id\n        contact {\n          id\n          name\n          surname\n          email\n        }\n      }\n      mainContact {\n        id\n        name\n        surname\n        displayName\n        gender\n        phone\n        email\n        completeAddress\n        postalCode\n      }\n      beneficiaries {\n        id\n        userId\n        user {\n          id\n          email\n        }\n        contactId\n        contact {\n          id\n          email\n          name\n          surname\n        }\n        deceasedRelation\n      }\n      procedureAssets {\n        id\n        name\n        value\n      }\n      state\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createProcedure($data: InheritanceProcedureFormDataInput!) {\n    createInheritanceProcedureFromForm(data: $data) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation createProcedure($data: InheritanceProcedureFormDataInput!) {\n    createInheritanceProcedureFromForm(data: $data) {\n      id\n    }\n  }\n']
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
  source: '\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        id\n        email\n        confirmed\n        isNotary\n        isBeneficiary\n        beneficiaries {\n          id\n          dateOfBirth\n          deceasedRelation\n          userId\n          contactId\n        }\n        notaries {\n          contactId\n          id\n          userId\n        }\n      }\n      token\n    }\n  }\n'
): (typeof documents)['\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        id\n        email\n        confirmed\n        isNotary\n        isBeneficiary\n        beneficiaries {\n          id\n          dateOfBirth\n          deceasedRelation\n          userId\n          contactId\n        }\n        notaries {\n          contactId\n          id\n          userId\n        }\n      }\n      token\n    }\n  }\n']
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
  source: '\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      contact {\n        id\n        name\n        surname\n        displayName\n        completeAddress\n        email\n        gender\n        postalCode\n        phone\n        email\n        gender\n      }\n    }\n  }\n'
): (typeof documents)['\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      contact {\n        id\n        name\n        surname\n        displayName\n        completeAddress\n        email\n        gender\n        postalCode\n        phone\n        email\n        gender\n      }\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never

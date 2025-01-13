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
  '\n  mutation ChangeUserStatus($userId: Float!) {\n    toggleUserConfirmation(userId: $userId) {\n      confirmed\n    }\n  }\n':
    types.ChangeUserStatusDocument,
  '\n  query GetUsers {\n    getAllUsers {\n      id\n      name\n      surname\n      displayName\n      address {\n        id\n        municipality\n        postalCode\n        street\n        streetNumber\n      }\n      addressId\n      type\n      confirmed\n      notaryId\n    }\n  }\n':
    types.GetUsersDocument,
  '\n  mutation createAsset($data: AssetInput!) {\n    createAsset(data: $data) {\n      id\n      proceedingId\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n':
    types.CreateAssetDocument,
  '\n  mutation DeleteAsset($id: Int!) {\n    deleteAsset(id: $id)\n  }\n':
    types.DeleteAssetDocument,
  '\n  query getAssetsByProcedureId($procedureId: Int!) {\n    getAssetsByProceedingId(proceedingId: $procedureId) {\n      id\n      proceedingId\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n':
    types.GetAssetsByProcedureIdDocument,
  '\n  mutation UpdateAsset($id: Int!, $data: AssetInput!) {\n    updateAsset(id: $id, data: $data) {\n      id\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n':
    types.UpdateAssetDocument,
  '\n  query GetBeneficiaryGroups($userId: Int!) {\n    getBeneficiaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      state\n    }\n  }\n':
    types.GetBeneficiaryGroupsDocument,
  '\n  query GetNotaryGroups($userId: Int!) {\n    getNotaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      state\n    }\n  }\n':
    types.GetNotaryGroupsDocument,
  '\n  mutation addMessage($body: String!, $proceedingId: Int!, $userId: Int!) {\n    addChatMessage(body: $body, proceedingId: $proceedingId, userId: $userId) {\n      chatId\n      body\n      userId\n    }\n  }\n':
    types.AddMessageDocument,
  '\n  query ChatByProceedingId($proceedingId: Int!) {\n    chatByProceedingId(proceedingId: $proceedingId) {\n      chatMessages {\n        body\n        chatId\n        createdAt\n        displayName\n        id\n        userId\n      }\n    }\n  }\n':
    types.ChatByProceedingIdDocument,
  '\n  subscription newChatMessage($proceedingId: Int!) {\n    newChatMessage(proceedingId: $proceedingId) {\n      body\n      chatId\n      createdAt\n      displayName\n      id\n      userId\n    }\n  }\n':
    types.NewChatMessageDocument,
  '\n  query GetChatHeader($getProceedingByIdId: Int!) {\n    getProceedingById(id: $getProceedingByIdId) {\n      beneficiaries {\n        user {\n          displayName\n          id\n        }\n      }\n      notary {\n        user {\n          displayName\n          id\n        }\n      }\n      name\n    }\n  }\n':
    types.GetChatHeaderDocument,
  '\n  mutation DeleteAttachment($id: ID!) {\n    deleteAttachmentsByIds(ids: [$id])\n  }\n':
    types.DeleteAttachmentDocument,
  '\n  query GetAttachmentsByProceedingId($proceedingId: Int!) {\n    getAttachmentsByProceedingId(proceedingId: $proceedingId) {\n      fileUuid\n      filename\n      id\n      mimetype\n      uploadDate\n    }\n  }\n':
    types.GetAttachmentsByProceedingIdDocument,
  '\n  mutation UploadDocument($data: UploadFileToProceedingInput!) {\n    uploadAttachmentToProceeding(data: $data)\n  }\n':
    types.UploadDocumentDocument,
  '\n  mutation NotifyProcedureBeneficiaries(\n    $html: String!\n    $subject: String!\n    $proceedingId: Int!\n  ) {\n    notifyProcedureBeneficiaries(\n      html: $html\n      subject: $subject\n      proceedingId: $proceedingId\n    )\n  }\n':
    types.NotifyProcedureBeneficiariesDocument,
  '\n  query GetProceedingsByBeneficiaryId($userId: Int!) {\n    getBeneficiaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n':
    types.GetProceedingsByBeneficiaryIdDocument,
  '\n  mutation createProceeding($data: CreateProceedingInput!) {\n    createProceeding(data: $data)\n  }\n':
    types.CreateProceedingDocument,
  '\n  mutation DeleteProceeding($ids: [Int!]!) {\n    deleteProceedingsByIds(ids: $ids)\n  }\n':
    types.DeleteProceedingDocument,
  '\n  query GetAllProceedings {\n    getAllProceedings {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n':
    types.GetAllProceedingsDocument,
  '\n  query GetAllUsers($type: String!) {\n    getAllUserByType(type: $type) {\n      id\n      name\n      surname\n      displayName\n    }\n  }\n':
    types.GetAllUsersDocument,
  '\n  query GetProceedingsByNotaryId($userId: Int!) {\n    getNotaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n':
    types.GetProceedingsByNotaryIdDocument,
  '\n  query GetProceedingById($getProceedingByIdId: Int!) {\n    getProceedingById(id: $getProceedingByIdId) {\n      procedureAssets {\n        id\n        proceedingId\n        value\n        name\n        description\n        type\n        bankName\n        carMakeName\n        carRegistrationDate\n        carType\n        cin\n      }\n      mainBeneficiary {\n        id\n        user {\n          id\n          displayName\n          email\n          phone\n          name\n          surname\n          confirmed\n          type\n        }\n      }\n      beneficiaries {\n        id\n        user {\n          displayName\n          email\n          phone\n          id\n          name\n          surname\n          confirmed\n          type\n        }\n      }\n      name\n      deceasedDisplayName\n      deceasedDateOfDeath\n      deceasedDateOfBirth\n      deceasedAddressId\n      deceasedAddress {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n      id\n      state\n      notaryId\n      notary {\n        id\n        user {\n          address {\n            id\n            street\n            streetNumber\n            municipality\n            postalCode\n          }\n          displayName\n          email\n          name\n          surname\n          phone\n          id\n          confirmed\n          type\n        }\n      }\n    }\n  }\n':
    types.GetProceedingByIdDocument,
  '\n  mutation RemoveBeneficiaryFromProceeding(\n    $beneficiaryId: Int!\n    $proceedingId: Int!\n  ) {\n    removeBeneficiaryFromProceeding(\n      beneficiaryId: $beneficiaryId\n      proceedingId: $proceedingId\n    )\n  }\n':
    types.RemoveBeneficiaryFromProceedingDocument,
  '\n  mutation AddBeneficiariesToProceeding(\n    $userIds: [Int!]!\n    $proceedingId: Int!\n  ) {\n    addBeneficiariesToProceeding(\n      userIds: $userIds\n      proceedingId: $proceedingId\n    ) {\n      id\n      user {\n        id\n        displayName\n        email\n        phone\n        name\n        surname\n        confirmed\n        type\n      }\n    }\n  }\n':
    types.AddBeneficiariesToProceedingDocument,
  '\n  mutation RemoveMainBeneficiary($proceedingId: Int!) {\n    removeMainBeneficiary(proceedingId: $proceedingId)\n  }\n':
    types.RemoveMainBeneficiaryDocument,
  '\n  mutation AssignMainBeneficiary($beneficiaryId: Int!, $proceedingId: Int!) {\n    assignMainBeneficiary(\n      beneficiaryId: $beneficiaryId\n      proceedingId: $proceedingId\n    )\n  }\n':
    types.AssignMainBeneficiaryDocument,
  '\n  mutation UpdateProceedingName($name: String!, $proceedingId: Int!) {\n    updateName(name: $name, proceedingId: $proceedingId)\n  }\n':
    types.UpdateProceedingNameDocument,
  '\n  mutation CloseProceeding($proceedingId: Int!) {\n    closeProceeding(proceedingId: $proceedingId)\n  }\n':
    types.CloseProceedingDocument,
  '\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n':
    types.ChangePasswordDocument,
  '\n  query GetNotaryDateRules($notaryId: Int!) {\n    getNotaryDateRulesByNotary(notaryId: $notaryId) {\n      id\n      startDay\n      startMonth\n      endDay\n      endMonth\n    }\n  }\n':
    types.GetNotaryDateRulesDocument,
  '\n  query GetNotaryAddressRules($getNotaryByIdId: Int!) {\n    getNotaryById(id: $getNotaryByIdId) {\n      postalCode\n    }\n  }\n':
    types.GetNotaryAddressRulesDocument,
  '\n  query GetUserById($getUserByIdId: Float!) {\n    getUserById(id: $getUserByIdId) {\n      id\n      email\n      password\n      confirmed\n      type\n      notaryId\n      sendNotifications\n      name\n      surname\n      displayName\n      gender\n      phone\n      addressId\n      address {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n    }\n  }\n':
    types.GetUserByIdDocument,
  '\n  mutation UpdateProfile($profileInput: ProfileInput!) {\n    updateProfile(profileInput: $profileInput) {\n      id\n      email\n      password\n      confirmed\n      type\n      notaryId\n      sendNotifications\n      name\n      surname\n      displayName\n      gender\n      phone\n      addressId\n      address {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n    }\n  }\n':
    types.UpdateProfileDocument,
  '\n  mutation EmailVerification($token: String!) {\n    confirmEmailVerification(token: $token)\n  }\n':
    types.EmailVerificationDocument,
  '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n':
    types.RequestPasswordResetDocument,
  '\n  mutation xdd($newPassword: String!, $token: String!) {\n    resetPassword(newPassword: $newPassword, token: $token)\n  }\n':
    types.XddDocument,
  '\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        addressId\n        address {\n          id\n          municipality\n          postalCode\n          street\n          streetNumber\n        }\n        confirmed\n        displayName\n        email\n        gender\n        id\n        name\n        phone\n        sendNotifications\n        surname\n        type\n        notaryId\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp($registerInput: RegisterInput!) {\n    signUp(registerInput: $registerInput) {\n      id\n    }\n  }\n':
    types.SignUpDocument,
  '\n  mutation CreateArticle($data: CreateArticleInput!) {\n    createArticle(data: $data) {\n      id\n    }\n  }\n':
    types.CreateArticleDocument,
  '\n  mutation DeleteArticle($ids: [Int!]!) {\n    deleteArticles(ids: $ids)\n  }\n':
    types.DeleteArticleDocument,
  '\n  query GetArticleById($getArticleByIdId: Int!) {\n    getArticleById(id: $getArticleByIdId) {\n      id\n      date\n      title\n      content\n      coverImageAttachmentId\n      attachment {\n        id\n        fileUuid\n        mimetype\n      }\n    }\n  }\n':
    types.GetArticleByIdDocument,
  '\n  query GetAllArticles {\n    getAllArticles {\n      id\n      date\n      title\n      content\n      coverImageAttachmentId\n      attachment {\n        id\n        fileUuid\n        mimetype\n      }\n    }\n  }\n':
    types.GetAllArticlesDocument,
  '\n  mutation UpdateArticle($data: UpdateArticleInput!, $updateArticleId: Int!) {\n    updateArticle(data: $data, id: $updateArticleId) {\n      id\n    }\n  }\n':
    types.UpdateArticleDocument,
  '\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      id\n      user {\n        id\n        name\n        surname\n        displayName\n        email\n        gender\n        phone\n        address {\n          street\n          streetNumber\n          municipality\n          postalCode\n        }\n      }\n    }\n  }\n':
    types.FindNotaryDocument,
  '\n  query GetAddressSuggestions($query: String!) {\n  getAddressSuggestions(query: $query) {\n    street\n    streetNumber\n    municipality\n    postalCode\n  }\n}\n':
    types.GetAddressSuggestionsDocument,
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
  source: '\n  mutation ChangeUserStatus($userId: Float!) {\n    toggleUserConfirmation(userId: $userId) {\n      confirmed\n    }\n  }\n'
): (typeof documents)['\n  mutation ChangeUserStatus($userId: Float!) {\n    toggleUserConfirmation(userId: $userId) {\n      confirmed\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUsers {\n    getAllUsers {\n      id\n      name\n      surname\n      displayName\n      address {\n        id\n        municipality\n        postalCode\n        street\n        streetNumber\n      }\n      addressId\n      type\n      confirmed\n      notaryId\n    }\n  }\n'
): (typeof documents)['\n  query GetUsers {\n    getAllUsers {\n      id\n      name\n      surname\n      displayName\n      address {\n        id\n        municipality\n        postalCode\n        street\n        streetNumber\n      }\n      addressId\n      type\n      confirmed\n      notaryId\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createAsset($data: AssetInput!) {\n    createAsset(data: $data) {\n      id\n      proceedingId\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n'
): (typeof documents)['\n  mutation createAsset($data: AssetInput!) {\n    createAsset(data: $data) {\n      id\n      proceedingId\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteAsset($id: Int!) {\n    deleteAsset(id: $id)\n  }\n'
): (typeof documents)['\n  mutation DeleteAsset($id: Int!) {\n    deleteAsset(id: $id)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAssetsByProcedureId($procedureId: Int!) {\n    getAssetsByProceedingId(proceedingId: $procedureId) {\n      id\n      proceedingId\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n'
): (typeof documents)['\n  query getAssetsByProcedureId($procedureId: Int!) {\n    getAssetsByProceedingId(proceedingId: $procedureId) {\n      id\n      proceedingId\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateAsset($id: Int!, $data: AssetInput!) {\n    updateAsset(id: $id, data: $data) {\n      id\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateAsset($id: Int!, $data: AssetInput!) {\n    updateAsset(id: $id, data: $data) {\n      id\n      type\n      name\n      value\n      description\n      bankName\n      carMakeName\n      carRegistrationDate\n      carType\n      cin\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBeneficiaryGroups($userId: Int!) {\n    getBeneficiaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      state\n    }\n  }\n'
): (typeof documents)['\n  query GetBeneficiaryGroups($userId: Int!) {\n    getBeneficiaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      state\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNotaryGroups($userId: Int!) {\n    getNotaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      state\n    }\n  }\n'
): (typeof documents)['\n  query GetNotaryGroups($userId: Int!) {\n    getNotaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      state\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation addMessage($body: String!, $proceedingId: Int!, $userId: Int!) {\n    addChatMessage(body: $body, proceedingId: $proceedingId, userId: $userId) {\n      chatId\n      body\n      userId\n    }\n  }\n'
): (typeof documents)['\n  mutation addMessage($body: String!, $proceedingId: Int!, $userId: Int!) {\n    addChatMessage(body: $body, proceedingId: $proceedingId, userId: $userId) {\n      chatId\n      body\n      userId\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ChatByProceedingId($proceedingId: Int!) {\n    chatByProceedingId(proceedingId: $proceedingId) {\n      chatMessages {\n        body\n        chatId\n        createdAt\n        displayName\n        id\n        userId\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ChatByProceedingId($proceedingId: Int!) {\n    chatByProceedingId(proceedingId: $proceedingId) {\n      chatMessages {\n        body\n        chatId\n        createdAt\n        displayName\n        id\n        userId\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription newChatMessage($proceedingId: Int!) {\n    newChatMessage(proceedingId: $proceedingId) {\n      body\n      chatId\n      createdAt\n      displayName\n      id\n      userId\n    }\n  }\n'
): (typeof documents)['\n  subscription newChatMessage($proceedingId: Int!) {\n    newChatMessage(proceedingId: $proceedingId) {\n      body\n      chatId\n      createdAt\n      displayName\n      id\n      userId\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetChatHeader($getProceedingByIdId: Int!) {\n    getProceedingById(id: $getProceedingByIdId) {\n      beneficiaries {\n        user {\n          displayName\n          id\n        }\n      }\n      notary {\n        user {\n          displayName\n          id\n        }\n      }\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetChatHeader($getProceedingByIdId: Int!) {\n    getProceedingById(id: $getProceedingByIdId) {\n      beneficiaries {\n        user {\n          displayName\n          id\n        }\n      }\n      notary {\n        user {\n          displayName\n          id\n        }\n      }\n      name\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteAttachment($id: ID!) {\n    deleteAttachmentsByIds(ids: [$id])\n  }\n'
): (typeof documents)['\n  mutation DeleteAttachment($id: ID!) {\n    deleteAttachmentsByIds(ids: [$id])\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAttachmentsByProceedingId($proceedingId: Int!) {\n    getAttachmentsByProceedingId(proceedingId: $proceedingId) {\n      fileUuid\n      filename\n      id\n      mimetype\n      uploadDate\n    }\n  }\n'
): (typeof documents)['\n  query GetAttachmentsByProceedingId($proceedingId: Int!) {\n    getAttachmentsByProceedingId(proceedingId: $proceedingId) {\n      fileUuid\n      filename\n      id\n      mimetype\n      uploadDate\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UploadDocument($data: UploadFileToProceedingInput!) {\n    uploadAttachmentToProceeding(data: $data)\n  }\n'
): (typeof documents)['\n  mutation UploadDocument($data: UploadFileToProceedingInput!) {\n    uploadAttachmentToProceeding(data: $data)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation NotifyProcedureBeneficiaries(\n    $html: String!\n    $subject: String!\n    $proceedingId: Int!\n  ) {\n    notifyProcedureBeneficiaries(\n      html: $html\n      subject: $subject\n      proceedingId: $proceedingId\n    )\n  }\n'
): (typeof documents)['\n  mutation NotifyProcedureBeneficiaries(\n    $html: String!\n    $subject: String!\n    $proceedingId: Int!\n  ) {\n    notifyProcedureBeneficiaries(\n      html: $html\n      subject: $subject\n      proceedingId: $proceedingId\n    )\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProceedingsByBeneficiaryId($userId: Int!) {\n    getBeneficiaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n'
): (typeof documents)['\n  query GetProceedingsByBeneficiaryId($userId: Int!) {\n    getBeneficiaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createProceeding($data: CreateProceedingInput!) {\n    createProceeding(data: $data)\n  }\n'
): (typeof documents)['\n  mutation createProceeding($data: CreateProceedingInput!) {\n    createProceeding(data: $data)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteProceeding($ids: [Int!]!) {\n    deleteProceedingsByIds(ids: $ids)\n  }\n'
): (typeof documents)['\n  mutation DeleteProceeding($ids: [Int!]!) {\n    deleteProceedingsByIds(ids: $ids)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllProceedings {\n    getAllProceedings {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n'
): (typeof documents)['\n  query GetAllProceedings {\n    getAllProceedings {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllUsers($type: String!) {\n    getAllUserByType(type: $type) {\n      id\n      name\n      surname\n      displayName\n    }\n  }\n'
): (typeof documents)['\n  query GetAllUsers($type: String!) {\n    getAllUserByType(type: $type) {\n      id\n      name\n      surname\n      displayName\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProceedingsByNotaryId($userId: Int!) {\n    getNotaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n'
): (typeof documents)['\n  query GetProceedingsByNotaryId($userId: Int!) {\n    getNotaryProceedingsForUser(userId: $userId) {\n      id\n      name\n      startDate\n      state\n      deceasedDisplayName\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProceedingById($getProceedingByIdId: Int!) {\n    getProceedingById(id: $getProceedingByIdId) {\n      procedureAssets {\n        id\n        proceedingId\n        value\n        name\n        description\n        type\n        bankName\n        carMakeName\n        carRegistrationDate\n        carType\n        cin\n      }\n      mainBeneficiary {\n        id\n        user {\n          id\n          displayName\n          email\n          phone\n          name\n          surname\n          confirmed\n          type\n        }\n      }\n      beneficiaries {\n        id\n        user {\n          displayName\n          email\n          phone\n          id\n          name\n          surname\n          confirmed\n          type\n        }\n      }\n      name\n      deceasedDisplayName\n      deceasedDateOfDeath\n      deceasedDateOfBirth\n      deceasedAddressId\n      deceasedAddress {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n      id\n      state\n      notaryId\n      notary {\n        id\n        user {\n          address {\n            id\n            street\n            streetNumber\n            municipality\n            postalCode\n          }\n          displayName\n          email\n          name\n          surname\n          phone\n          id\n          confirmed\n          type\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProceedingById($getProceedingByIdId: Int!) {\n    getProceedingById(id: $getProceedingByIdId) {\n      procedureAssets {\n        id\n        proceedingId\n        value\n        name\n        description\n        type\n        bankName\n        carMakeName\n        carRegistrationDate\n        carType\n        cin\n      }\n      mainBeneficiary {\n        id\n        user {\n          id\n          displayName\n          email\n          phone\n          name\n          surname\n          confirmed\n          type\n        }\n      }\n      beneficiaries {\n        id\n        user {\n          displayName\n          email\n          phone\n          id\n          name\n          surname\n          confirmed\n          type\n        }\n      }\n      name\n      deceasedDisplayName\n      deceasedDateOfDeath\n      deceasedDateOfBirth\n      deceasedAddressId\n      deceasedAddress {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n      id\n      state\n      notaryId\n      notary {\n        id\n        user {\n          address {\n            id\n            street\n            streetNumber\n            municipality\n            postalCode\n          }\n          displayName\n          email\n          name\n          surname\n          phone\n          id\n          confirmed\n          type\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation RemoveBeneficiaryFromProceeding(\n    $beneficiaryId: Int!\n    $proceedingId: Int!\n  ) {\n    removeBeneficiaryFromProceeding(\n      beneficiaryId: $beneficiaryId\n      proceedingId: $proceedingId\n    )\n  }\n'
): (typeof documents)['\n  mutation RemoveBeneficiaryFromProceeding(\n    $beneficiaryId: Int!\n    $proceedingId: Int!\n  ) {\n    removeBeneficiaryFromProceeding(\n      beneficiaryId: $beneficiaryId\n      proceedingId: $proceedingId\n    )\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddBeneficiariesToProceeding(\n    $userIds: [Int!]!\n    $proceedingId: Int!\n  ) {\n    addBeneficiariesToProceeding(\n      userIds: $userIds\n      proceedingId: $proceedingId\n    ) {\n      id\n      user {\n        id\n        displayName\n        email\n        phone\n        name\n        surname\n        confirmed\n        type\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AddBeneficiariesToProceeding(\n    $userIds: [Int!]!\n    $proceedingId: Int!\n  ) {\n    addBeneficiariesToProceeding(\n      userIds: $userIds\n      proceedingId: $proceedingId\n    ) {\n      id\n      user {\n        id\n        displayName\n        email\n        phone\n        name\n        surname\n        confirmed\n        type\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation RemoveMainBeneficiary($proceedingId: Int!) {\n    removeMainBeneficiary(proceedingId: $proceedingId)\n  }\n'
): (typeof documents)['\n  mutation RemoveMainBeneficiary($proceedingId: Int!) {\n    removeMainBeneficiary(proceedingId: $proceedingId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AssignMainBeneficiary($beneficiaryId: Int!, $proceedingId: Int!) {\n    assignMainBeneficiary(\n      beneficiaryId: $beneficiaryId\n      proceedingId: $proceedingId\n    )\n  }\n'
): (typeof documents)['\n  mutation AssignMainBeneficiary($beneficiaryId: Int!, $proceedingId: Int!) {\n    assignMainBeneficiary(\n      beneficiaryId: $beneficiaryId\n      proceedingId: $proceedingId\n    )\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateProceedingName($name: String!, $proceedingId: Int!) {\n    updateName(name: $name, proceedingId: $proceedingId)\n  }\n'
): (typeof documents)['\n  mutation UpdateProceedingName($name: String!, $proceedingId: Int!) {\n    updateName(name: $name, proceedingId: $proceedingId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CloseProceeding($proceedingId: Int!) {\n    closeProceeding(proceedingId: $proceedingId)\n  }\n'
): (typeof documents)['\n  mutation CloseProceeding($proceedingId: Int!) {\n    closeProceeding(proceedingId: $proceedingId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n'
): (typeof documents)['\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNotaryDateRules($notaryId: Int!) {\n    getNotaryDateRulesByNotary(notaryId: $notaryId) {\n      id\n      startDay\n      startMonth\n      endDay\n      endMonth\n    }\n  }\n'
): (typeof documents)['\n  query GetNotaryDateRules($notaryId: Int!) {\n    getNotaryDateRulesByNotary(notaryId: $notaryId) {\n      id\n      startDay\n      startMonth\n      endDay\n      endMonth\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNotaryAddressRules($getNotaryByIdId: Int!) {\n    getNotaryById(id: $getNotaryByIdId) {\n      postalCode\n    }\n  }\n'
): (typeof documents)['\n  query GetNotaryAddressRules($getNotaryByIdId: Int!) {\n    getNotaryById(id: $getNotaryByIdId) {\n      postalCode\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserById($getUserByIdId: Float!) {\n    getUserById(id: $getUserByIdId) {\n      id\n      email\n      password\n      confirmed\n      type\n      notaryId\n      sendNotifications\n      name\n      surname\n      displayName\n      gender\n      phone\n      addressId\n      address {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUserById($getUserByIdId: Float!) {\n    getUserById(id: $getUserByIdId) {\n      id\n      email\n      password\n      confirmed\n      type\n      notaryId\n      sendNotifications\n      name\n      surname\n      displayName\n      gender\n      phone\n      addressId\n      address {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateProfile($profileInput: ProfileInput!) {\n    updateProfile(profileInput: $profileInput) {\n      id\n      email\n      password\n      confirmed\n      type\n      notaryId\n      sendNotifications\n      name\n      surname\n      displayName\n      gender\n      phone\n      addressId\n      address {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateProfile($profileInput: ProfileInput!) {\n    updateProfile(profileInput: $profileInput) {\n      id\n      email\n      password\n      confirmed\n      type\n      notaryId\n      sendNotifications\n      name\n      surname\n      displayName\n      gender\n      phone\n      addressId\n      address {\n        id\n        street\n        streetNumber\n        municipality\n        postalCode\n      }\n    }\n  }\n']
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
  source: '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n'
): (typeof documents)['\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation xdd($newPassword: String!, $token: String!) {\n    resetPassword(newPassword: $newPassword, token: $token)\n  }\n'
): (typeof documents)['\n  mutation xdd($newPassword: String!, $token: String!) {\n    resetPassword(newPassword: $newPassword, token: $token)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        addressId\n        address {\n          id\n          municipality\n          postalCode\n          street\n          streetNumber\n        }\n        confirmed\n        displayName\n        email\n        gender\n        id\n        name\n        phone\n        sendNotifications\n        surname\n        type\n        notaryId\n      }\n      token\n    }\n  }\n'
): (typeof documents)['\n  mutation SignIn($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      user {\n        addressId\n        address {\n          id\n          municipality\n          postalCode\n          street\n          streetNumber\n        }\n        confirmed\n        displayName\n        email\n        gender\n        id\n        name\n        phone\n        sendNotifications\n        surname\n        type\n        notaryId\n      }\n      token\n    }\n  }\n']
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
  source: '\n  mutation CreateArticle($data: CreateArticleInput!) {\n    createArticle(data: $data) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateArticle($data: CreateArticleInput!) {\n    createArticle(data: $data) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteArticle($ids: [Int!]!) {\n    deleteArticles(ids: $ids)\n  }\n'
): (typeof documents)['\n  mutation DeleteArticle($ids: [Int!]!) {\n    deleteArticles(ids: $ids)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetArticleById($getArticleByIdId: Int!) {\n    getArticleById(id: $getArticleByIdId) {\n      id\n      date\n      title\n      content\n      coverImageAttachmentId\n      attachment {\n        id\n        fileUuid\n        mimetype\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetArticleById($getArticleByIdId: Int!) {\n    getArticleById(id: $getArticleByIdId) {\n      id\n      date\n      title\n      content\n      coverImageAttachmentId\n      attachment {\n        id\n        fileUuid\n        mimetype\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllArticles {\n    getAllArticles {\n      id\n      date\n      title\n      content\n      coverImageAttachmentId\n      attachment {\n        id\n        fileUuid\n        mimetype\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllArticles {\n    getAllArticles {\n      id\n      date\n      title\n      content\n      coverImageAttachmentId\n      attachment {\n        id\n        fileUuid\n        mimetype\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateArticle($data: UpdateArticleInput!, $updateArticleId: Int!) {\n    updateArticle(data: $data, id: $updateArticleId) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateArticle($data: UpdateArticleInput!, $updateArticleId: Int!) {\n    updateArticle(data: $data, id: $updateArticleId) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      id\n      user {\n        id\n        name\n        surname\n        displayName\n        email\n        gender\n        phone\n        address {\n          street\n          streetNumber\n          municipality\n          postalCode\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query FindNotary($input: FindNotaryInput!) {\n    findNotary(input: $input) {\n      id\n      user {\n        id\n        name\n        surname\n        displayName\n        email\n        gender\n        phone\n        address {\n          street\n          streetNumber\n          municipality\n          postalCode\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAddressSuggestions($query: String!) {\n  getAddressSuggestions(query: $query) {\n    street\n    streetNumber\n    municipality\n    postalCode\n  }\n}\n'
): (typeof documents)['\n  query GetAddressSuggestions($query: String!) {\n  getAddressSuggestions(query: $query) {\n    street\n    streetNumber\n    municipality\n    postalCode\n  }\n}\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never

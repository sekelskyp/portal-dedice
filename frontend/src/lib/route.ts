export const route = {
  home: () => `/`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  resetPassword: () => `/auth/passwordReset`,
  changePassword: () => `/auth/changePassword`,
  about: () => `/about`,
  guide: () => `/guide`,
  blog: () => `/blog`,
  termOfService: () => `/terms-of-service`,
  newArticle: () => `/blog/new-article`,
  editArticle: (id = ':id') => `/blog/article/edit/${id}`,
  detailArticle: (id = ':id') => `/blog/article/${id}`,
  wizard: () => `/wizard`,
  inheritance: () => `/inheritance`,
  portal: () => `/portal/proceedings`,
  newProceeding: () => `/portal/newProceeding`,
  settings: () => `/portal/settings`,
  chat: () => `/portal/chat/`,
  chatId: (proceedingId = ':proceedingId') => `/portal/chat/${proceedingId}`,
  chatIdHistory: (proceedingId = ':proceedingId') =>
    `/portal/chat/${proceedingId}/history`,
  emailVerification: () => `/auth/email-verification`,
  confirmEmail: () => `/auth/confirm-email`,
  proceeding: (proceedingId = ':proceedingId') =>
    `/portal/proceeding/${proceedingId}`,
  newDocument: (proceedingId = ':proceedingId') =>
    `/portal/proceeding/${proceedingId}/new-document`,
  newAsset: (proceedingId = ':proceedingId') =>
    `/portal/proceeding/${proceedingId}/assets`,
  newEmail: (proceedingId = ':proceedingId') =>
    `/portal/proceeding/${proceedingId}/new-email`,
  profile: () => `/portal/profile`,
  downloadFile: (fileUuid: string = ':fileUuid') =>
    `/files/download/${fileUuid}`,
  streamFile: (fileUuid: string = ':fileUuid') => `/files/stream/${fileUuid}`,
  users: () => `/admin/users`,
}

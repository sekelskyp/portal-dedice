export const route = {
  home: () => `/`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  resetPassword: () => `/auth/passwordReset`,
  about: () => `/about`,
  guide: () => `/guide`,
  blog: () => `/blog`,
  wizard: () => `/wizard`,
  portal: () => `/portal/proceedings`,
  newProceeding: () => `/portal/newProceeding`,
  settings: () => `/portal/settings`,
  emailVerification: () => `/auth/email-verification`,
  confirmEmail: () => `/auth/confirm-email`,
  inheritanceProcedure: (id = ':id') => `/portal/inheritance-procedure/${id}`,
  documents: (id = ':id') => `/portal/inheritance-procedure/${id}/documents`,
  newDocument: (id = ':id') =>
    `/portal/inheritance-procedure/${id}/new-document`,
}

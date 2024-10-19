declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_URL: string
      BACKEND_URL: string
    }
  }
}

export {}

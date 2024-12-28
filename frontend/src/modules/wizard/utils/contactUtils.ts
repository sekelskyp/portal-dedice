import { z } from 'zod'

export const formatPhoneNumberForDisplay = (phone: string) => {
  return phone.replace(/(\d{3})(?=\d)/g, '$1 ')
}

export const isEmail = (text: string) => {
  const emailSchema = z.string().email()
  return emailSchema.safeParse(text).success
}

export const isPhone = (text: string) => {
  const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/)
  return phoneSchema.safeParse(text).success
}

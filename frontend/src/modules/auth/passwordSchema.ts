import * as z from 'zod'

export const passwordSchema = z
  .string({ required_error: 'Heslo je povinné.' })
  .min(1, { message: 'Heslo je povinné' })
  .min(8, { message: 'Heslo musí mít alespoň 8 znaků' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Heslo musí obsahovat alespoň jedno velké písmeno',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Heslo musí obsahovat alespoň jedno malé písmeno',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Heslo musí obsahovat alespoň jednu číslici',
  })

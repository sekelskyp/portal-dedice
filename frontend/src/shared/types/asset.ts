export interface Asset {
  id: string
  proceedingId: string
  value: number
  name: string
  description?: string | null
  type: string
  bankName?: string | null
  carMakeName?: string | null
  carRegistrationDate?: Date | null
  carType?: string | null
  cin?: string | null
}

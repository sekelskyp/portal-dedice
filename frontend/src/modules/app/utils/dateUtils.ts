import { format } from 'date-fns'
import { cs } from 'date-fns/locale'

export const formatDate = (date: string | Date, f: string = 'MMMM Do yyyy') => {
  const formattedDate = format(new Date(date), f, { locale: cs })
  return formattedDate
}

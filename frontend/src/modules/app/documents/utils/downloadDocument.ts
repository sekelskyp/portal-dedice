import { route } from '@shared/route'

export const downloadDocument = (fileUuid: string, fileName: string) => {
  const url = route.downloadFile(fileUuid)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.target = '_blank'
  link.click()
}

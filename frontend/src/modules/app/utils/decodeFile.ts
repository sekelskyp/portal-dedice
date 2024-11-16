export function decodeFile({
  fileName,
  fileData,
  fileType,
}: {
  fileName: string
  fileData: string
  fileType: string
}) {
  const byteChars = atob(fileData)
  const byteNumbers = new Array(byteChars.length).map((_, i) =>
    byteChars.charCodeAt(i)
  )
  const byteArray = new Uint8Array(byteNumbers)

  const blob = new Blob([byteArray], { type: fileType })

  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = fileName
  link.target = '_blank'
  link.click()

  URL.revokeObjectURL(blobUrl)
}

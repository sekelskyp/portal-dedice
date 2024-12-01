export function createImageUrl(base64Data: string) {
  if (!base64Data) return ''

  try {
    const byteChars = atob(base64Data)
    const byteNumbers = new Array(byteChars.length)

    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'image/jpeg' })

    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error creating image URL:', error)
    return ''
  }
}

export function base64ToFile(base64Data: string): File | null {
  if (!base64Data) return null

  try {
    const byteChars = atob(base64Data)
    const byteNumbers = new Array(byteChars.length)

    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'image/jpeg' })

    return new File([blob], 'cover-image.jpg', { type: 'image/jpeg' })
  } catch (error) {
    console.error('Error converting base64 to File:', error)
    return null
  }
}

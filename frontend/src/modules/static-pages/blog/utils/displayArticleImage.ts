export const getArticleImageUrl = ({ fileUuid }: { fileUuid: string }) => {
  return `/files/stream/${fileUuid}`
}

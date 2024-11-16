import { useEffect, useState } from 'react'
import { Heading, IconButton, Link, Stack, Text } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { useDeleteDocument } from '../hooks/useDeleteDocument'
import { useGetDocuments } from '../hooks/useGetDocuments'
import { decodeFile } from '../utils/decodeFile'

interface DocumentType {
  id: string
  fileName: string
  fileData: string
  fileType: string
  createDate: string
}

export function Documents({ id }: { id: string }) {
  const { user } = useAuth()

  const [documents, setDocuments] = useState<DocumentType[]>([])

  const { data } = useGetDocuments({
    procedureId: parseInt(id),
  })

  const [deleteDocumentRequest] = useDeleteDocument()

  const handleFileShow = (
    fileName: string,
    fileData: string,
    fileType: string
  ) => {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      decodeFile({ fileName, fileData, fileType })
    }
  }

  const handleFileDelete = (documentId: string) => {
    deleteDocumentRequest({
      variables: {
        id: documentId,
      },
    }).then(() => {
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
    })
  }

  useEffect(() => {
    if (data?.getProcedureById?.documents) {
      setDocuments(data.getProcedureById.documents)
    }
  }, [data])

  return (
    <Stack>
      <Heading>Dokumenty v řízení</Heading>
      {!user?.isNotary && (
        <Stack direction="column" justifyContent="center" m={6}>
          <Stack gapY={4}>
            {documents?.map((document) => (
              <Stack
                key={document.id}
                direction={{ base: 'column', md: 'row' }}
                bg="gray.200"
                p={4}
                borderRadius="2xl"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center">
                  <IoDocumentTextOutline size={24} />
                  <Link
                    onClick={handleFileShow(
                      document.fileName,
                      document.fileData,
                      document.fileType
                    )}
                    wordBreak="break-word"
                    fontSize={{ base: 'sm', sm: 'md' }}
                  >
                    {decodeURIComponent(escape(document.fileName))}
                  </Link>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Text color="gray" fontSize={{ base: 'sm', sm: 'md' }}>
                    {new Date(document.createDate).toLocaleString('cs-CZ')}
                  </Text>
                  <IconButton
                    variant="surface"
                    colorPalette="red"
                    size={{ base: 'xs', sm: 'sm', md: 'md' }}
                    onClick={() => handleFileDelete(document.id)}
                  >
                    <MdDelete />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack alignItems="center" pt={4}>
            <RouterNavLink
              to={route.newDocument(id)}
              rounded="full"
              width="fit-content"
              textAlign="center"
            >
              Přiložit přílohu
              <FaCloudUploadAlt />
            </RouterNavLink>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

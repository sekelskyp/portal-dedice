import { useEffect, useState } from 'react'
import { Heading, IconButton, Link, Stack, Text } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import { useDeleteDocument } from '../hooks/useDeleteDocument'
import { useGetDocuments } from '../hooks/useGetDocuments'
import { useProcedure } from '../hooks/useProcedure'
import { decodeFile } from '../utils/decodeFile'

interface DocumentType {
  id: string
  fileName: string
  fileData: string
  fileType: string
  createDate: string
}

export function Documents({ id }: { id: string }) {
  const { user, token } = useAuth()

  const [documents, setDocuments] = useState<DocumentType[]>([])

  const procedure = useProcedure({ procedureId: parseInt(id) })

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

  if (!token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>Dokumenty v řízení</Heading>
          {documents.length > 0 && (
            <Stack justifyContent="center" alignItems="center">
              <Text textAlign="center" fontSize="lg" fontWeight="bold">
                {documents.length} / 10
              </Text>
            </Stack>
          )}
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Stack gapY={4} mx={0}>
            {documents.length > 0 ? (
              documents.map((document) => (
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
                    {procedure?.data?.getProcedureById?.beneficiaries?.some(
                      (item) => item.id === user?.beneficiaries[0]?.id
                    ) && (
                      <IconButton
                        variant="surface"
                        colorPalette="red"
                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
                        onClick={() => handleFileDelete(document.id)}
                      >
                        <MdDelete />
                      </IconButton>
                    )}
                  </Stack>
                </Stack>
              ))
            ) : (
              <Alert
                status="info"
                title="Nebyly nalezeny žádné dokumenty."
                width="fit-content"
              />
            )}
          </Stack>
          {!user?.isNotary && (
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
          )}
        </Stack>
      </Stack>
    )
  }
}

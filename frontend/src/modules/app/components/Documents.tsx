import { useEffect, useState } from 'react'
import { Heading, IconButton, Link, Stack, Text } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { useActionDialog } from '@frontend/shared/hooks/useActionDialog'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import { ActionDialog } from '../../../shared/components/ActionDialog'
import { useDeleteDocument } from '../hooks/useDeleteDocument'
import { useDocument } from '../hooks/useDocument'
import { useGetDocuments } from '../hooks/useGetDocuments'
import { useProceeding } from '../hooks/useProceeding'
import { decodeFile } from '../utils/decodeFile'

interface DocumentType {
  id: string
  fileName: string
  fileType: string
  createDate: string
}

export function Documents({ id }: { id: string }) {
  const { user, token } = useAuth()
  const isNotary = user?.type === 'Notary'

  const [documents, setDocuments] = useState<DocumentType[]>([])

  const procedure = useProceeding(parseInt(id))

  const { data } = useGetDocuments({
    proceedingId: parseInt(id),
  })

  const { toggleDialog, isOpen, selectedId } = useActionDialog()

  const [deleteDocumentRequest] = useDeleteDocument()

  const { getDocument } = useDocument()

  const handleFileShow = (
    documentId: string,
    fileName: string,
    fileType: string
  ) => {
    return async (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      const { data } = await getDocument({
        variables: {
          id: documentId,
        },
      })

      if (data?.getDocumentById) {
        decodeFile({
          fileName,
          fileData: data.getDocumentById.fileData,
          fileType,
        })
      }
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
    if (data?.getDocumentsByProceedingId) {
      setDocuments(data.getDocumentsByProceedingId)
    }
  }, [data])

  if (!token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack>
        {selectedId !== undefined ? (
          <ActionDialog
            title="Smazání dokumentu"
            text="Opravdu chcete tento dokument smazat?"
            onConfirm={handleFileDelete}
            isOpen={isOpen}
            toggle={toggleDialog}
            selectedId={selectedId}
          />
        ) : null}
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
                  bg="bg.emphasized"
                  p={4}
                  borderRadius="2xl"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" gap={4}>
                    <IoDocumentTextOutline size={24} />
                    <Link
                      onClick={handleFileShow(
                        document.id,
                        document.fileName,
                        document.fileType
                      )}
                      wordBreak="break-word"
                      fontSize={{ base: 'sm', sm: 'md' }}
                    >
                      {decodeURIComponent(escape(document.fileName))}
                    </Link>
                  </Stack>
                  <Stack direction="row" gap={4} alignItems="center">
                    <Text color="gray" fontSize={{ base: 'sm', sm: 'md' }}>
                      {new Date(document.createDate).toLocaleString('cs-CZ')}
                    </Text>
                    {procedure?.data?.getProceedingById?.beneficiaries?.some(
                      (item) => item.user?.id === user?.id?.toString()
                    ) && (
                      <IconButton
                        variant="surface"
                        colorPalette="red"
                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
                        onClick={() => toggleDialog(true, document.id)}
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
          {!isNotary && (
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

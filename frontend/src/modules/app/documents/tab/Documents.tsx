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

import { ActionDialog } from '../../../../shared/components/ActionDialog'
import { useProceedingContext } from '../../proceeding/components/ProceedingLayout'
import { useDeleteDocument } from '../hooks/useDeleteDocument'
import { useGetAttachments } from '../hooks/useGetDocuments'
import { downloadDocument } from '../utils/downloadDocument'

interface DocumentType {
  fileUUid: string
  id: string
  fileName: string
  fileType: string
  uploadDate: string
}

export function Documents({ id }: { id: string }) {
  const { user, token } = useAuth()
  const isUser = user?.type === 'User'
  const { proceeding } = useProceedingContext()
  const [documents, setDocuments] = useState<DocumentType[]>([])
  const [deleteDocumentRequest] = useDeleteDocument()
  const { toggleDialog, isOpen, selectedId } = useActionDialog()

  const { data } = useGetAttachments({
    proceedingId: parseInt(id),
  })

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
    if (data?.getAttachmentsByProceedingId) {
      setDocuments(
        data.getAttachmentsByProceedingId.map(
          (attachment: {
            fileUuid: string
            id: string
            filename: string
            mimetype: string
            uploadDate: string
          }) => ({
            fileUUid: attachment.fileUuid,
            id: attachment.id,
            fileName: attachment.filename,
            fileType: attachment.mimetype,
            uploadDate: attachment.uploadDate,
          })
        )
      )
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
                      onClick={() =>
                        downloadDocument(document.fileUUid, document.fileName)
                      }
                      wordBreak="break-word"
                      fontSize={{ base: 'sm', sm: 'md' }}
                      cursor="pointer"
                    >
                      {document.fileName}
                    </Link>
                  </Stack>
                  <Stack direction="row" gap={4} alignItems="center">
                    <Text color="gray" fontSize={{ base: 'sm', sm: 'md' }}>
                      {new Date(document.uploadDate).toLocaleString('cs-CZ')}
                    </Text>
                    {proceeding?.beneficiaries?.some(
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
          {isUser && (
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

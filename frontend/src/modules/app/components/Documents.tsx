import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { useGetDocuments } from '../hooks/useGetDocuments'
import { decodeFile } from '../utils/decodeFile'

export function Documents({ id }: { id: string }) {
  const { user } = useAuth()

  const { data } = useGetDocuments({
    procedureId: parseInt(id),
  })

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

  const documents = data?.getProcedureById?.documents

  return (
    <Stack>
      <Heading>Dokumenty v řízení</Heading>
      {!user?.isNotary && (
        <Stack direction="column" justifyContent="center" m={6}>
          <Stack gapY={4}>
            {documents?.map((document) => (
              <Stack
                direction={{ base: 'column', md: 'row' }}
                bg="gray.200"
                p={4}
                borderRadius="2xl"
                justifyContent="space-between"
                alignItems={{ base: 'center', md: 'flex-start' }}
              >
                <Stack direction="row" alignItems="center">
                  <IoDocumentTextOutline size={24} />
                  <Link
                    key={document.id}
                    onClick={handleFileShow(
                      document.fileName,
                      document.fileData,
                      document.fileType
                    )}
                  >
                    {document.fileName}
                  </Link>
                </Stack>
                <Text color="gray" fontSize={{ base: 'sm', sm: 'md' }}>
                  {new Date(document.createDate).toLocaleString('cs-CZ')}
                </Text>
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

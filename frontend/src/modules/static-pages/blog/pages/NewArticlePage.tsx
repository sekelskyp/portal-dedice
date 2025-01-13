import { useCallback } from 'react'
import { Box, Heading, IconButton, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { useAuth } from '@frontend/modules/auth'
import { DateFormControl } from '@frontend/shared/forms/DateFormControl'
import { FileUploadFormControl } from '@frontend/shared/forms/FileUploadFormControl'
import { Form } from '@frontend/shared/forms/Form'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'
import { QuillFormControl } from '@frontend/shared/forms/QuillFormControl'
import { SubmitButton } from '@frontend/shared/forms/SubmitButton'
import { Page } from '@frontend/shared/layout'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import { useCoverUpload } from '../hooks/useCoverUpload'
import { useCreateArticle } from '../hooks/useCreateArticle'
import { useGetArticle } from '../hooks/useGetArticle'
import { useUpdateArticle } from '../hooks/useUpdateArticle'

const articleSchema = z.object({
  title: z
    .string({ required_error: 'Titulek je povinný' })
    .min(1, 'Titulek je povinný'),
  date: z.date(),
  image: z.instanceof(File, { message: 'Obrázek je povinný' }),
  text: z
    .string({ required_error: 'Obsah je povinný' })
    .min(1, 'Obsah je povinný'),
})

type ArticleFormData = z.infer<typeof articleSchema>

export const NewArticlePage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const isEditing = Boolean(id)
  const articleId = parseInt(id ?? '0', 10)

  const { data: existingArticle } = useGetArticle(articleId)
  const [createArticle, { loading: createLoading }] = useCreateArticle()
  const [updateArticle, { loading: updateLoading }] = useUpdateArticle()

  const navigate = useNavigate()
  const {
    ACCEPTED_FILE_TYPES,
    MAX_FILE_COUNT,
    MAX_FILE_SIZE,
    handleCoverUpload,
  } = useCoverUpload()

  const currentDate = new Date()

  const handleSubmit = useCallback(
    async (data: ArticleFormData) => {
      if (isEditing) {
        if (!data.image && !existingArticle?.getArticleById?.attachment) {
          throw new Error('Obrázek je povinný.')
        }
        await updateArticle({
          variables: {
            updateArticleId: articleId,
            data: {
              title: data.title,
              date: new Date(data.date).toISOString(),
              content: data.text,
              coverImage: data.image,
            },
          },
        })
      } else {
        if (!data.image) {
          throw new Error('Obrázek je povinný.')
        }
        await createArticle({
          variables: {
            data: {
              title: data.title,
              date: new Date(data.date).toISOString(),
              content: data.text,
              coverImage: data.image,
            },
          },
        })
      }
      navigate(route.blog())
    },
    [
      isEditing,
      existingArticle?.getArticleById?.attachment,
      updateArticle,
      articleId,
      createArticle,
      navigate,
    ]
  )

  if (!user || user.type !== 'Admin') {
    return <UnauthorizedPage />
  }

  return (
    <Page>
      <IconButton
        onClick={() => navigate(route.blog())}
        rounded="full"
        size="lg"
        bg="gray.500"
        _hover={{ bg: 'gray.700' }}
        mb={6}
      >
        <LuArrowLeft />
      </IconButton>
      <Box
        maxW={{ base: '100%', md: '80%' }}
        mx="auto"
        bg="grey.100"
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading size={{ base: '2xl', md: '4xl' }} mb={6}>
          {isEditing ? 'Úprava článku' : 'Vytvoření článku'}
        </Heading>
        <Form<ArticleFormData>
          onSubmit={handleSubmit}
          defaultValues={{
            date: isEditing
              ? new Date(existingArticle?.getArticleById?.date ?? new Date())
              : currentDate,
            title: existingArticle?.getArticleById?.title,
            text: existingArticle?.getArticleById?.content,
          }}
          resolver={zodResolver(articleSchema)}
          noValidate
        >
          <VStack gap={4} align="stretch">
            <InputFormControl
              name="title"
              label="Titulek"
              placeholder="Vložte titulek"
              required
            />
            <DateFormControl name="date" label="Datum" />
            <FileUploadFormControl
              name="image"
              label="Obrázek"
              accept={ACCEPTED_FILE_TYPES}
              maxFileSize={MAX_FILE_SIZE}
              maxFiles={MAX_FILE_COUNT}
              dropzoneLabel="Přetáhněte sem obrázek nebo klikněte pro výběr"
              dropzoneDescription="Podporované formáty: JPG, PNG"
              height="250px"
              width="100%"
              required
              onFileRejection={handleCoverUpload}
            />
            <QuillFormControl
              name="text"
              label="Obsah"
              placeholder="Vložte text článku"
              required
            />
            <SubmitButton
              loading={isEditing ? updateLoading : createLoading}
              loadingText={isEditing ? 'Ukládání...' : 'Vytváření...'}
            >
              {isEditing ? 'Uložit změny' : 'Vytvořit článek'}
            </SubmitButton>
          </VStack>
        </Form>
      </Box>
    </Page>
  )
}

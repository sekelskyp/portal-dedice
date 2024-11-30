import { Box, Heading, IconButton, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { DateFormControl } from '@frontend/shared/forms/DateFormControl'
import { FileUploadFormControl } from '@frontend/shared/forms/FileUploadFormControl'
import { Form } from '@frontend/shared/forms/Form'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'
import { QuillFormControl } from '@frontend/shared/forms/QuillFormControl'
import { SubmitButton } from '@frontend/shared/forms/SubmitButton'
import { Page } from '@frontend/shared/layout'
import { route } from '@shared/route'

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
  const navigate = useNavigate()
  const handleSubmit = (data: ArticleFormData) => {
    console.log('Form submitted:', data)
  }

  const currentDate = new Date()

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
        maxW="80%"
        mx="auto"
        bg="grey.100"
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading as="h1" size={'4xl'} mb={6}>
          Vytvoření článku
        </Heading>
        <Form<ArticleFormData>
          onSubmit={handleSubmit}
          defaultValues={{
            date: currentDate,
          }}
          resolver={zodResolver(articleSchema)}
          noValidate
        >
          <VStack gap={4} align="stretch">
            <InputFormControl
              name="title"
              label="Titulek"
              placeholder="Vložte titulek"
            />

            <DateFormControl name="date" label="Datum" />

            <FileUploadFormControl
              name="image"
              label="Obrázek"
              accept="image/*"
              dropzoneLabel="Přetáhněte sem obrázek nebo klikněte pro výběr"
              dropzoneDescription="Podporované formáty: JPG, PNG"
              height="250px"
              width="100%"
            />

            <QuillFormControl
              name="text"
              label="Obsah"
              placeholder="Vložte text článku"
            />

            <SubmitButton>Vytvořit článek</SubmitButton>
          </VStack>
        </Form>
      </Box>
    </Page>
  )
}

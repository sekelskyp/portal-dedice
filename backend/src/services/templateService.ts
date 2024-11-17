import fs from 'fs'
import hbs from 'handlebars'
import path from 'path'

export const renderTemplate = async (
  templateName: string,
  context: { [key: string]: unknown },
  useMainTemplate: boolean = true // Default to true to use the main template
): Promise<string> => {
  // Default variables to be included in all templates
  const defaultContext = {
    //logoUrl: `${process.env.APP_BASE_URL_FRONTEND}/frontend/public/logo.png`,
    mainPageUrl: process.env.APP_BASE_URL_FRONTEND,
  }
  // Merge the default context with the provided context
  const combinedContext = {
    ...defaultContext,
    ...context,
  }

  // Load and compile the body-specific template
  const bodyFilePath = path.resolve(
    __dirname,
    `../templates/${templateName}.hbs`
  )
  const bodySource = await fs.promises.readFile(bodyFilePath, 'utf8')
  const bodyTemplate = hbs.compile(bodySource)

  // Render the body-specific template with the provided context
  const renderedBody = bodyTemplate(combinedContext)

  if (!useMainTemplate) {
    // Return only the body template if the main template is not used
    return renderedBody
  }

  // If useMainTemplate is true, load and compile the main template
  const mainFilePath = path.resolve(__dirname, '../templates/main.hbs')
  const mainSource = await fs.promises.readFile(mainFilePath, 'utf8')
  const mainTemplate = hbs.compile(mainSource)

  // Add the rendered body content to the main context
  const finalContext = {
    ...combinedContext, // Use the combined context with default variables
    body: renderedBody, // Inject the body content into the main template
  }

  // Render the main template, injecting the rendered body
  return mainTemplate(finalContext)
}

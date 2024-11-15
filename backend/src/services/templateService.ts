import fs from 'fs'
import hbs from 'handlebars'
import path from 'path'

export const renderTemplate = async (
  templateName: string,
  context: { [key: string]: any },
  useMainTemplate: boolean = true // default to true to use the main template
): Promise<string> => {
  // Load and compile the body-specific template
  const bodyFilePath = path.resolve(
    __dirname,
    `../templates/${templateName}.hbs`
  )
  const bodySource = await fs.promises.readFile(bodyFilePath, 'utf8')
  const bodyTemplate = hbs.compile(bodySource)

  // Render the body-specific template with the provided context
  const renderedBody = bodyTemplate(context)

  if (!useMainTemplate) {
    // Return only the body template if main template is not used
    return renderedBody
  }

  // If useMainTemplate is true, load and compile the main template
  const mainFilePath = path.resolve(__dirname, `../templates/main.hbs`)
  const mainSource = await fs.promises.readFile(mainFilePath, 'utf8')
  const mainTemplate = hbs.compile(mainSource)

  // Add the rendered body content to the main context
  const finalContext = {
    ...context,
    body: renderedBody,
  }

  // Render the main template, injecting the rendered body
  return mainTemplate(finalContext)
}

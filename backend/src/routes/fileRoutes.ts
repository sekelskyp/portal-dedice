import { Request, Response, Router } from 'express'
import fs from 'fs/promises'
import path from 'path'

import { FILE_UPLOADS_DIR } from '@backend/config'
import { CustomContext } from '@backend/types/types'
import { route } from '@shared/route'

const router = Router()

// Utility to resolve file paths securely
const getFilePath = (fileUuid: string): string => {
  return path.join(FILE_UPLOADS_DIR, fileUuid)
}

// Utility to check if a file exists
const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath)
    return true
  } catch (err) {
    return false
  }
}

// Download Route
router.get(
  route.downloadFile(':fileUuid'),
  async (req: Request, res: Response) => {
    const { fileUuid } = req.params
    const context: CustomContext = res.locals.context // Retrieve context from res.locals
    const filePath = getFilePath(fileUuid)

    try {
      const attachment =
        await context.attachmentRepository.getAttachmentByUuid(fileUuid)

      if (!attachment) {
        return res.status(404).send('File not found in database')
      }

      const fileExists = await checkFileExists(filePath)
      if (!fileExists) {
        return res.status(404).send('File not found on server')
      }

      res.download(filePath, attachment.filename, (err) => {
        if (err) {
          console.error('Error downloading file:', err)
          res.status(500).send('Error downloading file')
        }
      })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).send('Internal server error')
    }
  }
)

// Stream Route
router.get(
  route.streamFile(':fileUuid'),
  async (req: Request, res: Response) => {
    const { fileUuid } = req.params
    const context: CustomContext = res.locals.context // Retrieve context from res.locals

    const filePath = getFilePath(fileUuid)

    try {
      const attachment =
        await context.attachmentRepository.getAttachmentByUuid(fileUuid)

      if (!attachment) {
        return res.status(404).send('File not found in database')
      }

      const fileExists = await checkFileExists(filePath)
      if (!fileExists) {
        return res.status(404).send('File not found on server')
      }
      // Set Content-Type header based on the file's MIME type
      res.setHeader('Content-Type', attachment.mimetype)
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error streaming file:', err)
          res.status(500).send('Error streaming file')
        }
      })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).send('Internal server error')
    }
  }
)

export const fileRoutes = router

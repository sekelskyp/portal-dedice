import { Request, Response, Router } from 'express'
import fs from 'fs/promises'
import path from 'path'

import { FILE_UPLOADS_DIR } from '@backend/config'
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
    const fileUuid = req.params.fileUuid
    const filePath = getFilePath(fileUuid)
    console.log('download endpoint zavolan')
    try {
      const fileExists = await checkFileExists(filePath)
      if (!fileExists) {
        console.log(
          'fuck you soubor nenalezen. test test test. filepath: ',
          filePath
        )
        return res.status(404).send('File not found')
      }
      res.download(filePath, (err) => {
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
    const fileUuid = req.params.fileUuid
    const filePath = getFilePath(fileUuid)

    try {
      const fileExists = await checkFileExists(filePath)
      if (!fileExists) {
        return res.status(404).send('File not found')
      }
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

export default router

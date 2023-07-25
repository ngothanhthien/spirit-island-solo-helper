import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const directoryPath = path.resolve(
  __dirname,
  'D:\\stuff\\app\\original\\dumb',
)
const outputDirectoryPath = path.join(directoryPath, 'resized')

// Create output directory if it doesn't exist
fs.mkdirSync(outputDirectoryPath, { recursive: true })

fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  for (const file of files) {
    if (
      path.extname(file) === '.jpg' ||
      path.extname(file) === '.jpeg' ||
      path.extname(file) === '.png' ||
      path.extname(file) === '.webp'
    ) {
      const filePath = path.join(directoryPath, file)
      const fileNameWithoutExt = path.basename(file, path.extname(file))
      const outputFilePath = path.join(
        outputDirectoryPath,
        fileNameWithoutExt + '.webp',
      )

      try {
        await sharp(filePath)
          // .linear(1.05)
          .resize(450)
          // .webp()
          .toFile(outputFilePath)

        console.log(
          `Resized, converted to WebP, and optimized image ${file} successfully.`,
        )
      } catch (err) {
        console.log(
          'Error resizing, converting to WebP, and optimizing image: ' + err,
        )
      }
    }
  }
})

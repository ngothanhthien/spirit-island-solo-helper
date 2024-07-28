import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const directoryPath = path.resolve(
  __dirname,
  'images',
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
        formatFileName(fileNameWithoutExt, 'avatar') + '.webp',
      )

      try {
        // const metadata = await sharp(filePath).metadata()
        await sharp(filePath)
          // .extract({ // crop
          //   left: 0,
          //   top: 300,
          //   bottom: 300,
          //   width: metadata.width,
          //   height: metadata.height - 600,
          // })
          // .linear(1.05)
          .resize(3200) //power
          // .resize(300)//avatar
          // .resize(250)
          // .rotate(-90)
          // .resize(1500)// spirit panel
          .webp({ quality: 100 })
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

function formatFileName(fileName) {
  let output = fileName.replace(/'/g, '')
  output = output.replace(/ /g, '_')
  output = output.replace(/,/g, '')
  output = output.toLowerCase()
  //extra stuff
  output = output.replace(/_\(ni\)/g, '')
  return output
}

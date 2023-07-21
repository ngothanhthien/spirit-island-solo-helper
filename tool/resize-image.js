import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = path.resolve(__dirname, 'D:\\stuff\\app\\public\\img\\powers');
const outputDirectoryPath = path.join(directoryPath, 'resized');

// Create output directory if it doesn't exist
fs.mkdirSync(outputDirectoryPath, { recursive: true });

fs.readdir(directoryPath, async (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    for (const file of files) {
        if(path.extname(file) === ".jpg" || path.extname(file) === ".png" || path.extname(file) === ".webp") {
            const filePath = path.join(directoryPath, file);
            const fileNameWithoutExt = path.basename(file, path.extname(file));
            const outputFilePath = path.join(outputDirectoryPath, fileNameWithoutExt + '_x300' + path.extname(file));

            try {
                await sharp(filePath)
                    .resize(300)
                    .jpeg({ quality: 80 })  // Compress the image (if it's a JPEG)
                    .png({ quality: 80 })   // Compress the image (if it's a PNG)
                    .webp({ quality: 80 })  // Compress the image (if it's a WebP)
                    .toFile(outputFilePath);
                
                console.log(`Resized and optimized image ${file} successfully.`);
            } catch(err) {
                console.log('Error resizing and optimizing image: ' + err);
            }
        }
    }
});

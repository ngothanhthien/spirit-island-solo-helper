import fs from 'fs';
import { join, extname } from 'path';
import sharp from 'sharp';

const { mkdirSync, promises: { readdir } } = fs;

const cutSpriteSheet = async (filename, numSpritesWidth, numSpritesHeight) => {
  console.log(`Processing file: ${filename}`);
  
  const image = sharp(filename);
  const metadata = await image.metadata();

  const spriteWidth = Math.floor(metadata.width / numSpritesWidth);
  const spriteHeight = Math.floor(metadata.height / numSpritesHeight);

  // specify output directory
  const outputDir = join('sprites', filename);
  
  // ensure the directory exists
  mkdirSync(outputDir, { recursive: true });

  let counter = 1;
  for (let y = 0; y < metadata.height; y += spriteHeight) {
    for (let x = 0; x < metadata.width; x += spriteWidth) {
      console.log(`\tCreating sprite at position (${x}, ${y})`);
      await sharp(filename)
        .extract({ left: x, top: y, width: spriteWidth, height: spriteHeight })
        .toFile(join(outputDir, `sprite_${counter}.png`));
      counter++;
    }
  }
}

const processDirectory = async (directory, size) => {
  // Parse sprite dimensions from input string
  const [numSpritesWidth, numSpritesHeight] = size.split('x').map(Number);

  const files = await readdir(directory);
  const imageFiles = files.filter(file => ['.png', '.jpg', '.jpeg'].includes(extname(file).toLowerCase()));

  for (const file of imageFiles) {
    await cutSpriteSheet(join(directory, file), numSpritesWidth, numSpritesHeight);
  }
}

// example usage
processDirectory('images', '2x3'); // For a 2x2 grid of sprites
// processDirectory('images', '4x4'); // For a 4x4 grid of sprites
// processDirectory('images', '6x6'); // For a 6x6 grid of sprites, and so on...

import fs from 'fs';
import path from 'path';
import { replacePathSeparator } from '../helper/helpers.js';

export const copy = async (filePath, newDirectoryPath) => {
  try {
    const fileName = replacePathSeparator(filePath).split('/').splice(-1)[0];
    const newFilePath = path.join(newDirectoryPath, fileName);
    const readable = fs.createReadStream(filePath, 'utf-8');
    const writable = fs.createWriteStream(newFilePath);

    readable.pipe(writable);
  } catch (e) {
    console.log('Operation failed');
  }
};


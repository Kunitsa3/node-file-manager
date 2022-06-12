import fs from 'fs';
import { pipeline } from 'stream';
import zlib from 'zlib';

export const compress = async (filePath, destinationPath) => {
  const input = fs.createReadStream(filePath, 'utf-8');
  const output = fs.createWriteStream(destinationPath);
  const brotli = zlib.createBrotliCompress();

  pipeline(input, brotli, output, err => {
    if (err) {
      console.log('Operation failed');
    }
  });
};


import fs from 'fs';
import { pipeline } from 'stream';
import zlib from 'zlib';

export const decompress = async (filePath, destinationPath) => {
  const read = fs.createReadStream(filePath);
  const write = fs.createWriteStream(destinationPath);
  const brotli = zlib.createBrotliDecompress();

  pipeline(read, brotli, write, err => {
    if (err) {
      console.log('Operation failed');
    }
  });
};


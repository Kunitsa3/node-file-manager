import crypto from 'crypto';
import fs from 'fs';

export const calculateHash = async path => {
  const hash = crypto.createHash('sha256');
  const readableStream = fs.createReadStream(path);

  readableStream.on('readable', () => {
    const data = readableStream.read();
    if (data) hash.update(data);
    else {
      console.log(hash.digest('hex'));
    }
  });
};


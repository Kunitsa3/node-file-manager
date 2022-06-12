import fs from 'fs';

export const read = async path => {
  const stream = fs.createReadStream(path, 'utf-8');

  let data = '';

  stream.on('data', chunk => (data += chunk));
  stream.on('end', () => console.log(data));
  stream.on('error', () => console.log('Operation failed'));
};


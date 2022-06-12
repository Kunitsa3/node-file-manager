import fs from 'fs';

export const remove = async path => {
  fs.readFile(path, err => {
    if (err) console.log('Operation failed');

    fs.unlink(path, err => {
      if (err) console.log('Operation failed');
    });
  });
};


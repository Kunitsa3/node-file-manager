import fs from 'fs';
import { replacePathSeparator } from '../helper/helpers.js';

export const copy = async (filePath, newDirectoryPath) => {
  const currentFilePath = replacePathSeparator(filePath).split('/');
  currentFilePath.splice(-1);
  const oldDirectoryPath = currentFilePath.join('/');
  const newFilePath = filePath.replace(oldDirectoryPath, newDirectoryPath);

  fs.readdir(oldDirectoryPath, (err, files) => {
    if (err) console.log('Operation failed');

    fs.mkdir(newDirectoryPath, err => {
      if (err) console.log('Operation failed');

      files.forEach(file => {
        fs.copyFile(filePath, newFilePath, err => {
          if (err) console.log('Operation failed');
        });
      });
    });
  });
};


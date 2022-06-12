import fs from 'fs';
import { getPath, replacePathSeparator } from '../helper/helpers.js';

export const rename = async (pathToOldFile, newFilename) => {
  const absolutePathToOldFile = getPath(pathToOldFile);
  const oldFileName = replacePathSeparator(absolutePathToOldFile).split('/').splice(-1);
  const newFilePath = absolutePathToOldFile.replace(oldFileName, newFilename);

  fs.readFile(absolutePathToOldFile, err => {
    if (err) {
      console.log('Operation failed');
    }
    fs.readFile(newFilePath, err => {
      if (!err) {
        console.log('Operation failed');
      }

      fs.rename(absolutePathToOldFile, newFilePath, err => {
        if (err) console.log('Operation failed');
      });
    });
  });
};


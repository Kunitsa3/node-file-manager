import { getPath } from '../helper/helpers.js';

export const changeFolder = directoryPath => {
  try {
    global.currentFolder = getPath(directoryPath);
    process.chdir(global.currentFolder);
  } catch (e) {
    console.log('Operation failed');
  }
};


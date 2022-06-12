import path from 'path';

export const goToUpFolder = () => {
  try {
    let currentDirectory = global.currentFolder;
    global.currentFolder = path.join(currentDirectory, '../');
    process.chdir(global.currentFolder);
  } catch (e) {
    console.log('Operation failed');
  }
};


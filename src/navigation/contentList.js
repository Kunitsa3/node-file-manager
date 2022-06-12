import fs from 'fs';

export const getContentList = () => {
  fs.readdir(global.currentFolder, (err, files) => {
    if (err) {
      return console.log('Operation failed');
    }

    console.log(files);
  });
};


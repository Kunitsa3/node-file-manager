import fs from 'fs';

export const create = async filename => {
  fs.writeFile(global.currentFolder + `/${filename}`, '', { flag: 'ax' }, err => {
    if (err) {
      console.log('Operation failed');
    }
  });
};


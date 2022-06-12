global.currentFolder = process.env.HOME || process.env.USERPROFILE || '';
import { changeFolder } from './navigation/changeDirectory.js';
import { getContentList } from './navigation/contentList.js';
import { copy } from './fs/copy.js';
import { create } from './fs/create.js';
import { getCurrentDirectory } from './navigation/currentDirectory.js';
import { remove } from './fs/delete.js';
import { processFinished } from './finish.js';
import { read } from './fs/readFile.js';
import { rename } from './fs/rename.js';
import { goToUpFolder } from './navigation/upFolder.js';
import { eol } from './os/eol.js';
import { cpu } from './os/cpu.js';
import { homedir } from './os/homedir.js';
import { logUsername } from './os/username.js';
import { architecture } from './os/architecture.js';
import { calculateHash } from './hash/hash.js';
import { getPath } from './helper/helpers.js';
import { compress } from './compress/compress.js';
import { decompress } from './compress/decompress.js';

const name = process.argv.filter(arg => arg.startsWith('--username'))[0].slice(11);
console.log(`Welcome to the File Manager, ${name}!`);
getCurrentDirectory();

process.stdin.on('data', data => {
  try {
    const newData = [...data];
    newData.splice(-2);
    const stringData = Buffer.from(newData).toString();

    if (stringData === '.exit') {
      processFinished(name);
      return;
    }

    if (stringData === 'up') {
      goToUpFolder();
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('cd')) {
      const path = stringData.slice(3);
      changeFolder(path);
      getCurrentDirectory();
      return;
    }

    if (stringData === 'ls') {
      getContentList();
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('cat')) {
      const path = getPath(stringData.slice(4));
      read(path);
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('add')) {
      const fileName = stringData.slice(4);
      create(fileName);
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('rn')) {
      const [pathToOldFile, newFilename] = stringData.slice(3).split(' ');
      rename(pathToOldFile, newFilename);
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('cp')) {
      const [filePath, newDirectoryPath] = stringData.slice(3).split(' ');
      copy(getPath(filePath), getPath(newDirectoryPath));
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('rm')) {
      const path = getPath(stringData.slice(3));
      remove(path);
      getCurrentDirectory();
      return;
    }

    if (stringData === 'os --EOL') {
      eol();
      getCurrentDirectory();
      return;
    }

    if (stringData === 'os --cpus') {
      cpu();
      getCurrentDirectory();
      return;
    }

    if (stringData === 'os --homedir') {
      homedir();
      getCurrentDirectory();
      return;
    }

    if (stringData === 'os --username') {
      logUsername();
      getCurrentDirectory();
      return;
    }

    if (stringData === 'os --architecture') {
      architecture();
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('hash')) {
      const path = getPath(stringData.slice(5));
      calculateHash(path);
      getCurrentDirectory();

      return;
    }

    if (stringData.startsWith('compress')) {
      const [filePath, destinationPath] = stringData.slice(9).split(' ');
      compress(getPath(filePath), getPath(destinationPath));
      getCurrentDirectory();
      return;
    }

    if (stringData.startsWith('decompress')) {
      const [filePath, destinationPath] = stringData.slice(11).split(' ');
      decompress(getPath(filePath), getPath(destinationPath));
      getCurrentDirectory();
      return;
    }

    console.log('Invalid input');
  } catch (e) {
    console.log('Operation failed');
  }
});

process.on('SIGINT', () => {
  processFinished(name);
});


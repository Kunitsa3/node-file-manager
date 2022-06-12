import path from 'path';

export const getPath = pathToFile => {
  const systemDrive = `${global.currentFolder?.split(':')[0]}:`;

  if (pathToFile.startsWith('/') || pathToFile.startsWith('\\')) {
    return path.join(systemDrive, pathToFile);
  }
  return path.join(global.currentFolder, pathToFile);
};

export const replacePathSeparator = pathToFile => {
  return pathToFile.replaceAll('\\', '/');
};


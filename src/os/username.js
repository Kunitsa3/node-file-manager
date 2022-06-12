import os from 'os';

export const logUsername = () => {
  console.log(os.userInfo().username);
};


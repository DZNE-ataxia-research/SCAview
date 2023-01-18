const generateIdentifier = () => {
  return Math.floor(Math.random() * 16777215 ** 2).toString(16);
};

const devLog = (message?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, ...optionalParams);
  }
};

export default {
  generateIdentifier,
  devLog,
};

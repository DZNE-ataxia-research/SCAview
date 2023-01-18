const setStringItem = (key: string, item: string) => {
  if (localStorage) {
    localStorage.setItem(key, item);
  }
};

const setObjectItem = (key: string, item: any) => {
  setStringItem(key, JSON.stringify(item));
};

const getStringItem = (key: string): string | null => {
  if (localStorage) {
    return localStorage.getItem(key);
  } else {
    return null;
  }
};

const getObjectItem = (key: string): any | null => {
  const value = getStringItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return value;
  }
};

const removeItem = (key: string) => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
};

export default {
  setStringItem,
  setObjectItem,
  getStringItem,
  getObjectItem,
  removeItem,
};

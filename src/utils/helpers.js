const clearLocalStorageKey = (key) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(key);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export { clearLocalStorageKey, validateEmail };

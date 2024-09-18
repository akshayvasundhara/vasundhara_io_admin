// encryptionUtils.js

import CryptoJS from 'crypto-js';

const encryptionKey = process.env.REACT_APP_CRYPTO_JS_KEY;

export const encryptAndStoreLoc = (key, data) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    localStorage.setItem(key, encryptedData);
    return true;
  } catch (error) {
    console.error('Encryption failed:', error);
    return false;
  }
};

export const decryptFromStoreLoc = (key) => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    }
    return null;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

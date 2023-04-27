/// <reference types="chrome" />

const savePassword = (url: string, password: string) => {
  chrome.storage.sync.get('passwordHistory', (data) => {
    let passwordHistory = data.passwordHistory || {};

    passwordHistory[url] = { password };

    chrome.storage.sync.set({ passwordHistory }, () => {
      console.log('Password history updated.');
    });
  });
};

const getPasswordHistory = (callback: (passwordHistory: { [url: string]: { password: string } }) => void) => {
  chrome.storage.sync.get('passwordHistory', (data) => {
    callback(data.passwordHistory || {});
  });
};

const deletePassword = (url: string) => {
  chrome.storage.sync.get('passwordHistory', (data) => {
    let passwordHistory = data.passwordHistory || {};

    if (passwordHistory[url]) {
      delete passwordHistory[url];
      chrome.storage.sync.set({ passwordHistory }, () => {
        console.log('Password entry deleted.');
      });
    }
  });
};

const updatePassword = (url: string, newPassword: string) => {
  chrome.storage.sync.get('passwordHistory', (data) => {
    let passwordHistory = data.passwordHistory || {};

    if (passwordHistory[url]) {
      passwordHistory[url].password = newPassword;
      chrome.storage.sync.set({ passwordHistory }, () => {
        console.log('Password entry updated.');
      });
    }
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'savePassword') {
    savePassword(request.url, request.password);
    sendResponse({ success: true });
  } else if (request.type === 'getPasswordHistory') {
    getPasswordHistory((passwordHistory) => {
      sendResponse(passwordHistory);
    });
  } else if (request.type === 'deletePassword') {
    deletePassword(request.url);
    sendResponse({ success: true });
  } else if (request.type === 'updatePassword') {
    updatePassword(request.url, request.newPassword);
    sendResponse({ success: true });
  }

  return true;
});

/// <reference types="chrome" />

// Prevent collision with other extensions
const EXTENSION_NAME = 'Password Generator';
const HISTORY = `${EXTENSION_NAME}:history`;
const SETTINGS = `${EXTENSION_NAME}:settings`;

/* Password History */
const getFromStorage = (key: string): Promise<any> => { // Helper function to wrap chrome.storage.sync.get with a Promise
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      resolve(result[key]);
    });
  });
};

const setToStorage = (key: string, value: any): Promise<void> => { // Helper function to wrap chrome.storage.sync.set with a Promise
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve();
    });
  });
};

const savePassword = async (url: string, password: string) => { // UPDATE
  const history = (await getFromStorage(HISTORY)) || {};
  const time = Date.now();

  history[url] = { password, time };

  await setToStorage(HISTORY, history);
  console.log('Password history updated.');
};

const getPasswordHistory = async (callback: (history: { [url: string]: { password: string } }) => void) => { // GET
  const history = (await getFromStorage(HISTORY)) || {};
  callback(history);
};

const deletePassword = async (url: string) => { // DELETE
  const history = (await getFromStorage(HISTORY)) || {};

  if (history[url]) {
    delete history[url];
    await setToStorage(HISTORY, history);
    console.log('Password entry deleted.');
  }
};

/* Settings */
const saveSettings = async (settings: { [key: string]: any }) => { // UPDATE
  await setToStorage(SETTINGS, settings);
  console.log('Settings updated.');
};

const getSettings = async (callback: (settings: { [key: string]: any }) => void) => { // GET
  const settings = (await getFromStorage(SETTINGS)) || {};
  callback(settings);
};

/* Event Listener Handler */
const handleRequest = (request: any, sendResponse: (response: any) => void) => {
  switch (request.type) {
    case 'savePassword':
      savePassword(request.url, request.password);
      sendResponse({ success: true });
      break;

    case 'getPasswordHistory':
      getPasswordHistory((passwordHistory) => {
        sendResponse(passwordHistory);
      });
      break;

    case 'deletePassword':
      deletePassword(request.url);
      sendResponse({ success: true });
      break;

    case 'getSettings':
      getSettings((settings) => {
        sendResponse(settings);
      });
      break;

    case 'saveSettings':
      saveSettings(request.settings);
      sendResponse({ success: true });
      break;

    default:
      sendResponse({ success: false, message: 'Unknown request type' });
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleRequest(request, sendResponse);
  return true; // To indicate that the response will be sent asynchronously
});


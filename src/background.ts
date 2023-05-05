/// <reference types="chrome" />
import { SettingState, GenerateSettingState } from "./types";

// Prevent collision with other extensions
const EXTENSION_NAME = 'Password Generator';
const HISTORY = `${EXTENSION_NAME}:history`;
const SETTINGS = `${EXTENSION_NAME}:settings`;
const GENERATE = `${EXTENSION_NAME}:generate`;

/*
   _____ _                              
  / ____| |                             
 | |    | |__  _ __ ___  _ __ ___   ___ 
 | |    | '_ \| '__/ _ \| '_ ` _ \ / _ \
 | |____| | | | | | (_) | | | | | |  __/  storage
  \_____|_| |_|_|  \___/|_| |_| |_|\___|  helpers
*/

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

/* Settings (Symbols: string, Language) */
const saveSettings = async (settings: SettingState) => { // UPDATE
  await setToStorage(SETTINGS, settings);
  console.log('Settings updated.', settings);
};

const getSettings = async (callback: (settings: SettingState) => void) => { // GET
  const settings = (await getFromStorage(SETTINGS)) || {};
  callback(settings);
};

/* Generate Settings (Symbols: bool, Length) */
const saveGenerateSettings = async (settings: GenerateSettingState) => { // UPDATE
  await setToStorage(GENERATE, settings);
  console.log('Generate settings updated.', settings);
};

const getGenerateSettings = async (callback: (settings: GenerateSettingState) => void) => { // GET
  const settings = (await getFromStorage(GENERATE)) || {};
  callback(settings);
};

/*
|    .  __  ___  ___ .  .  ___  __  
|    | /__`  |  |__  |\ | |__  |__)  event
|___ | .__/  |  |___ | \| |___ |  \  handlers
*/
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

    case 'getGenerateSettings':
      getGenerateSettings((settings) => {
        sendResponse(settings);
      });
      break;

    case 'saveGenerateSettings':
      saveGenerateSettings(request.settings);
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


/// <reference types="chrome" />

const savePassword = (url: string, password: string) => {
  chrome.storage.sync.get('passwordHistory', (data) => {
    let passwordHistory = data.passwordHistory || [];
    
    const existingEntryIndex = passwordHistory.findIndex((entry: any) => entry.url === url);
    const newEntry = { url, password };
    
    if (existingEntryIndex > -1) {
      passwordHistory[existingEntryIndex] = newEntry;
    } else {
      passwordHistory.push(newEntry);
    }
    
    chrome.storage.sync.set({ passwordHistory }, () => {
      console.log('Password history updated.');
    });
  });
};

const getPasswordHistory = (callback: (passwordHistory: any[]) => void) => {
  chrome.storage.sync.get('passwordHistory', (data) => {
    callback(data.passwordHistory || []);
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'savePassword') {
    savePassword(request.url, request.password);
    sendResponse({ success: true });
  } else if (request.type === 'getPasswordHistory') {
    getPasswordHistory((passwordHistory) => {
      sendResponse({ passwordHistory });
    });
  }

  return true;
});

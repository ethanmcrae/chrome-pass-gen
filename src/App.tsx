import React, { useState, useEffect, SetStateAction } from 'react';
import VerificationBar from './components/VerificationBar';
import Settings from './components/Settings';
import History, { HistoryData, PasswordData } from './components/History';

const App: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [passwordHistory, setPasswordHistory] = useState<HistoryData>({});

  const handleCopy = () => {
    const password = copyRandomPassword(passwordLength, includeSpecialChars);
    displayCopyMessage();
    savePassToHistory(password, setPasswordHistory);
  };

  const displayCopyMessage = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  // Copy the password to the clipboard when the popup is opened
  useEffect(() => {
    // Copy a new password to the clipboard
    handleCopy();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <VerificationBar isCopied={isCopied} />
      <Settings onCopy={handleCopy} passwordLength={passwordLength} setPasswordLength={setPasswordLength} includeSpecialChars={includeSpecialChars} setIncludeSpecialChars={setIncludeSpecialChars} />
      <History passwordHistory={passwordHistory} setPasswordHistory={setPasswordHistory} newPassword={handleCopy} copyToClipboard={copyToClipboard} displayCopy={displayCopyMessage} />
    </div>
  );
};

const generatePassword = (length: number, includeSpecialChars: boolean): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const specialChars = '!@#$%^&*()';
  const allChars = includeSpecialChars ? chars + specialChars : chars;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

const copyToClipboard = (text: string): void => {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

const copyRandomPassword = (length: number, includeSpecialChars: boolean): string => {
  const password = generatePassword(length, includeSpecialChars);
  copyToClipboard(password);
  return password;
}

const savePassToHistory = (password: string, setPasswordHistory: React.Dispatch<SetStateAction<HistoryData>>): void => {
  getCurrentTabUrl((url) => {
    if (!url) return; // Type error handling
    chrome.runtime.sendMessage({ type: 'savePassword', url, password });
    setPasswordHistory((passwordHistory: HistoryData) => ({...passwordHistory, [url]: {password}}));
  });
}

const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
  // Query for the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // If there is an active tab, return its URL, otherwise return undefined
    const url = tabs.length > 0 ? tabs[0].url : undefined;
    const baseUrl = getBaseURL(url!);
    callback(baseUrl);
  });
}

const getBaseURL = (url: string): string => {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}

export default App;

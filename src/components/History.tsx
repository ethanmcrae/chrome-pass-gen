import React, { useState, useEffect, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRefresh } from '@fortawesome/free-solid-svg-icons';

interface HistoryProps {
  passwordHistory: HistoryData;
  setPasswordHistory: React.Dispatch<React.SetStateAction<HistoryData>>;
  newPassword: () => void;
  copyToClipboard: (text: string) => void;
  displayCopy: () => void;
}

export interface HistoryData {
  [key: string]: PasswordData; // url: { ... }
}

export interface PasswordData {
  password: string;
}

const History: React.FC<HistoryProps> = ({ passwordHistory, setPasswordHistory, newPassword, copyToClipboard, displayCopy }) => {
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getPasswordHistory' }, (response) => {
      setPasswordHistory(response);
    });
  }, []);

  const handleRemove = (url: string) => {
    chrome.runtime.sendMessage({ type: 'deletePassword', url }, (response) => {
      if (response.success) {
        setPasswordHistory((prevHistory) => {
          const newHistory = { ...prevHistory };
          delete newHistory[url];
          return newHistory;
        });
      }
    });
  };

  const handleCopy = (event: React.MouseEvent<HTMLSpanElement>) => {
    const targetElement = event.target as HTMLSpanElement;
    const password: string = targetElement.innerHTML;
    copyToClipboard(password);
    displayCopy();
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <ul className="w-full">
        {Object.entries(passwordHistory).map(([url, passwordData], index) => (
          <li key={index} className="flex justify-between px-4 py-2 bg-white rounded shadow mb-2 gap-4">
            <span>{url}</span>
            <span className="cursor-pointer monospaced py-1 px-2 bg-gray-500 bg-opacity-20" onClick={handleCopy}>{passwordData.password}</span>
            <button
              onClick={newPassword}
              className="text-blue-600"
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>
            <button
              onClick={() => handleRemove(url)}
              className="text-red-600"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

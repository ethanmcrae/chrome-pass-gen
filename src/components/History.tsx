import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface HistoryProps {
  passwordHistory: HistoryData;
  setPasswordHistory: React.Dispatch<React.SetStateAction<HistoryData>>;
  newPassword: (length: number, includeSpecialChars: boolean) => string;
  passwordLength: number;
  includeSpecialChars: boolean;
}

export interface HistoryData {
  [key: string]: PasswordData; // url: { ... }
}

export interface PasswordData {
  password: string;
}

const History: React.FC<HistoryProps> = ({ passwordHistory, setPasswordHistory, newPassword, passwordLength, includeSpecialChars }) => {
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getPasswordHistory' }, (response) => {
      setPasswordHistory(response);
    });
  }, []);

  const handleUpdate = (url: string) => {
    const password = newPassword(passwordLength, includeSpecialChars);
    chrome.runtime.sendMessage({ type: 'updatePassword', url, password }, (response) => {
      if (response.success) {
        setPasswordHistory((prevHistory) => ({
          ...prevHistory,
          [url]: { password },
        }));
      }
    });
  };

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

  console.log('passwordHistory:');
  console.log(passwordHistory);

  return (
    <div className="flex flex-col items-center mt-4">
      <button className="px-2 py-1 mb-4 bg-blue-600 text-white rounded">
        <i className="material-icons">arrow_back</i>
      </button>
      <ul className="w-full">
        {Object.entries(passwordHistory).map(([url, passwordData], index) => (
          <li key={index} className="flex justify-between px-4 py-2 bg-white rounded shadow mb-2">
            <span>{url}</span>
            <span>{passwordData.password}</span>
            <button
              onClick={() => handleUpdate(url)}
              className="text-blue-600"
            >
              <FontAwesomeIcon icon={faEdit} />
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

import React, { useState, useEffect } from 'react';

interface HistoryProps {
  passwordHistory: HistoryData;
  setPasswordHistory: React.Dispatch<React.SetStateAction<HistoryData>>;
}
export interface HistoryData {
  [key: string]: PasswordData; // url: { ... }
}
export interface PasswordData {
  password: string;
}

const History: React.FC<HistoryProps> = ({ passwordHistory, setPasswordHistory }) => {

  // Load history:
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getPasswordHistory' }, (response) => {
      setPasswordHistory(response.passwordHistory);
    });
  }, []);

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

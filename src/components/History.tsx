import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { translate } from '../helpers/translate';
import { HistoryProps } from '../types';

const History: React.FC<HistoryProps> = ({ passwordHistory, setPasswordHistory, newPassword, copyToClipboard, displayCopy, settings }) => {
  const [visibleHistory, setVisibleHistory] = useState<boolean>(false);

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

  // Translated prompts
  const historyPrompt = translate(settings.language, "history")
  const showPrompt = translate(settings.language, "show")
  const hidePrompt = translate(settings.language, "hide")

  return (
    <div className="flex flex-col items-center mt-4">
      <button className="text-customPurple-100" onClick={() => setVisibleHistory(!visibleHistory)}>
        {(visibleHistory ? hidePrompt : showPrompt) + ' ' + historyPrompt}
      </button>
      {visibleHistory && (
        <ul className="w-full max-h-64 overflow-y-scroll mt-4 flex flex-col items-center">
          {Object.entries(passwordHistory)
            .sort((a, b) => b[1].time - a[1].time)
            .map(([url, passwordData], index) => (
              <li key={index} className="flex justify-between items-center w-11/12 px-4 py-2 bg-grayPurple rounded-lg shadow mb-2 gap-4" style={{height: '2rem'}}>
                <span className="w-[40%] overflow-x-auto">{url}</span>
                <div className="w-[40%] overflow-x-auto overflow-y-hidden">
                  <span className="cursor-pointer monospaced py-1 px-2 bg-gray-600 bg-opacity-20" onClick={handleCopy}>{passwordData.password}</span>
                </div>
                <button
                  onClick={newPassword}
                  className="text-customPurple-400"
                >
                  <FontAwesomeIcon icon={faRefresh} />
                </button>
                <button
                  onClick={() => handleRemove(url)}
                  className="text-red-800"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;

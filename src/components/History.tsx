import React, { useState } from 'react';
import HistoryItem from './HistoryItem';
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
    <div className="flex flex-col items-center mt-4 relative">
      <button className="text-customPurple-100" onClick={() => setVisibleHistory(!visibleHistory)}>
        {(visibleHistory ? hidePrompt : showPrompt) + ' ' + historyPrompt}
      </button>
      {visibleHistory && (
        <ul className="w-full max-h-64 overflow-y-scroll mt-4 flex flex-col items-center">
          {Object.entries(passwordHistory)
            .sort((a, b) => b[1].time - a[1].time)
            .map(([url, passwordData], index) => (
              <HistoryItem
                key={index}
                index={index}
                url={url}
                passwordData={passwordData}
                handleCopy={handleCopy}
                newPassword={newPassword}
                handleRemove={handleRemove}
                settings={settings}
              />
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;

// PasswordHistoryItem.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import HoverTooltip from './HoverTooltip';
import { translate, translateDate } from '../helpers/translate';
import { HistoryItemProps } from '../types';

const HistoryItem: React.FC<HistoryItemProps> = ({
  index,
  url,
  passwordData,
  handleCopy,
  newPassword,
  handleRemove,
  settings
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const createdAtPrompt = translate(settings.language, "created")
  const datePrompt = translateDate(settings.language, passwordData.time);

  return (
    <li
      key={index}
      className="flex justify-between items-center w-11/12 px-4 py-2 bg-grayPurple rounded-lg shadow mb-2 gap-4"
      style={{ height: '2rem' }}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      {showPopup && <HoverTooltip label={createdAtPrompt + ": " + datePrompt} />}
      <a
        href={"https://" + url}
        className="w-[40%] overflow-x-auto no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
      <div className="w-[40%] overflow-x-auto overflow-y-hidden">
        <span
          className="cursor-pointer monospaced py-1 px-2 bg-gray-600 bg-opacity-20"
          onClick={handleCopy}
        >
          {passwordData.password}
        </span>
      </div>
      <button onClick={newPassword} className="text-customPurple-400">
        <FontAwesomeIcon icon={faRefresh} />
      </button>
      <button onClick={() => handleRemove(url)} className="text-red-800">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default HistoryItem;

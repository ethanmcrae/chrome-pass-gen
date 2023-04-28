import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import AppleToggle from './AppleToggle';

interface SettingsProps {
  onCopy: () => void;
  includeSpecialChars: boolean;
  setIncludeSpecialChars: (includeSpecialChars: boolean) => void;
  passwordLength: number;
  setPasswordLength: (passwordLength: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ onCopy, includeSpecialChars, setIncludeSpecialChars, passwordLength, setPasswordLength }) => {

  return (
    <div className="flex mt-4 justify-around w-full">
      <div className="w-1/2 flex flex-col items-center p-3">
        <FontAwesomeIcon icon={faSync} className="text-white bg-blue-600 rounded-full p-4 text-2xl cursor-pointer" onClick={onCopy} />
        <button className="mt-2 text-gray-600 cursor-default">
          Generate Again
        </button>
      </div>
      <div className="w-1/2 flex flex-col items-center p-3">
        <div className="w-full mb-2">
          <label htmlFor="passwordLength" className="block text-xs">
            Length: {passwordLength}
          </label>
          <div className="flex items-center bg-white py-3 px-2 rounded-md">
            <span className="text-gray-700 text-xs">8</span>
            <input
              id="passwordLength"
              type="range"
              min="8"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="w-full cursor-pointer mx-2 h-[2px] appearance-none bg-gray-200 focus:outline-none transition duration-150 ease-in-out thumb:white"
              style={{
                background: `linear-gradient(90deg, #8B5CF6 ${
                  (passwordLength - 8) * 100 / 24
                }%, #d1d5db ${(passwordLength - 8) * 100 / 24}%)`,
              }}
            />
            <span className="text-gray-700 text-xs">32</span>
          </div>
        </div>
        <div className="w-full bg-white py-3 px-2 rounded-md">
          <AppleToggle state={includeSpecialChars} setState={setIncludeSpecialChars} label="Symbols" />
        </div>
      </div>
    </div>
  );
};

export default Settings;

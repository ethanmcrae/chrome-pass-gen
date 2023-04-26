import React, { useState } from 'react';

interface SettingsProps {
  onCopy: () => void;
  includeSpecialChars: boolean;
  setIncludeSpecialChars: (includeSpecialChars: boolean) => void;
  passwordLength: number;
  setPasswordLength: (passwordLength: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ onCopy, includeSpecialChars, setIncludeSpecialChars, passwordLength, setPasswordLength }) => {

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full">
        <label htmlFor="specialChars" className="inline-flex items-center">
          <input
            id="specialChars"
            type="checkbox"
            className="mr-2"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
          />
          Include special characters
        </label>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="passwordLength" className="block">Password length: {passwordLength}</label>
        <input
          id="passwordLength"
          type="range"
          min="8"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Number(e.target.value))}
        />
      </div>
      <button
        className="px-4 py-2 mt-4 bg-blue-600 text-white rounded"
        onClick={onCopy}
      >
        Generate Again
      </button>
    </div>
  );
};

export default Settings;

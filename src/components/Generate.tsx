import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import AppleToggle from './AppleToggle';
import { translate } from '../helpers/translate';
import { GenerateProps } from '../types';

const Generate: React.FC<GenerateProps> = ({ onCopy, includeSpecialChars, setIncludeSpecialChars, passwordLength, setPasswordLength, settings }) => {

  const generatePrompt = translate(settings.language, "generateAgain");
  const lengthPrompt = translate(settings.language, "length");
  const symbolsPrompt = translate(settings.language, "symbols");

  return (
    <div className="flex mt-4 justify-center w-full">
      <div className="w-1/2 flex flex-col justify-center items-center p-3" >
        <FontAwesomeIcon icon={faSync}
        className="text-white rounded-full text-4xl p-6 mt-4 cursor-pointer"
        style={{ background: "linear-gradient(315deg, rgba(127,87,180,1) 0%, rgba(135,87,180,1) 50%, rgba(142,87,180,1) 100%)"}}
        onClick={onCopy} />
        <button className="mt-2 text-gray-600" onClick={onCopy}>
          {generatePrompt}
        </button>
      </div>
      <div className="w-1/2 flex flex-col items-center p-3 max-w-[10rem]">
        <div className="w-full mb-2">
          <label htmlFor="passwordLength" className="block text-xs text-customPurple-200 ml-2">
            {`${lengthPrompt}: ${passwordLength}`}
          </label>
          <div className="flex items-center bg-gray-800 py-3 px-2 rounded-md">
            <span className="text-customPurple-100 text-xs">8</span>
            <input
              id="passwordLength"
              type="range"
              min="8"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="w-full cursor-pointer mx-2 h-[2px] appearance-none focus:outline-none transition duration-150 ease-in-out thumb:white"
              style={{
                background: `linear-gradient(90deg, #a372d0 ${
                  (passwordLength - 8) * 100 / 24
                }%, #6b6570 ${(passwordLength - 8) * 100 / 24}%)`,
              }}
            />
            <span className="text-customPurple-100 text-xs">32</span>
          </div>
        </div>
        <div className="w-full bg-gray-800 py-3 px-2 rounded-md">
          <AppleToggle state={includeSpecialChars} setState={setIncludeSpecialChars} label={symbolsPrompt} settings={settings} />
        </div>
      </div>
    </div>
  );
};

export default Generate;

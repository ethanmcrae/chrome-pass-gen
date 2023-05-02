import React, { useState } from 'react'
import TextInput from './TextInput';
import { SettingsProps } from '../types';

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const [symbols, setSymbols] = useState(settings ? settings.symbols : '');

  const updateSettings = () => {
    const newSettings = { symbols }; // TODO: Add others
    setSettings(newSettings);
    chrome.runtime.sendMessage({ type: 'saveSettings', settings: newSettings });
  };

  const updateSymbols = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbols(e.target.value);
  };

  const resetSymbols = (e: React.MouseEvent<SVGSVGElement>) => {
    setSymbols('!@#$%^&*()');
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-semibold mt-2">Settings</h2>
      {/* Options */}
      <div className="flex flex-col items-center mt-4">
        <TextInput type="text" label="Symbols" value={symbols} onUpdate={updateSymbols} onReset={resetSymbols} showReset />
        <button className="mt-4 text-gray-600" onClick={updateSettings}>Save</button>
      </div>
    </div>
  );
}

export default Settings;

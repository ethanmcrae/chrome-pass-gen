import React from 'react'
import TextInput from './TextInput';
import { SettingsProps } from '../types';

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {

  const updateSettings = () => {
    // TODO
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-semibold mt-2">Settings</h2>
      {/* Options */}
      <div className="flex flex-col items-center mt-4">
        <TextInput type="text" label="Symbols" value={settings} onUpdate={updateSettings} />
        <button className="mt-4 text-gray-600 cursor-default" onClick={updateSettings}>Save</button>
      </div>
    </div>
  );
}

export default Settings;

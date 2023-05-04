import React, { useState } from 'react'
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import { translate } from '../helpers/translate';
import { SettingsProps, Language, SettingState } from '../types';

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const [symbols, setSymbols] = useState(settings ? settings.symbols : '!@#$%^&*()');
  const [language, setLanguage] = useState(settings ? settings.language : Language.English);

  const updateSettings = () => {
    const newSettings: SettingState = { symbols, language };
    setSettings(newSettings);
    chrome.runtime.sendMessage({ type: 'saveSettings', settings: newSettings });
  };

  const updateSymbols = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbols(e.target.value);
  };

  const resetSymbols = (e: React.MouseEvent<SVGSVGElement>) => {
    setSymbols('!@#$%^&*()');
  };

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Array of possible language options
  const languages = Object.values(Language);
  // Translated prompts
  const settingsPrompt = translate(language, "settings");
  const symbolsPrompt = translate(language, "symbols");
  const savePrompt = translate(language, "save");

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-semibold mt-2">{settingsPrompt}</h2>
      {/* Options */}
      <div className="flex flex-col items-center mt-4">
        {/* Symbols */}
        <TextInput type="text" label={symbolsPrompt} value={symbols} onUpdate={updateSymbols} onReset={resetSymbols} showReset />
        {/* Language */}
        <Dropdown options={languages} selected={language} onChange={updateLanguage} />
        {/* Save Button */}
        <button className="mt-4 text-gray-600" onClick={updateSettings}>{savePrompt}</button>
      </div>
    </div>
  );
}

export default Settings;

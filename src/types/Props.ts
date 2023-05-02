import { HistoryData } from './History';
import { SettingState } from './State';
import { Language } from './Language';

export interface AppleToggleProps {
  state: boolean;
  setState: (state: boolean) => void;
  label: string;
}

export interface GenerateProps {
  onCopy: () => void;
  includeSpecialChars: boolean;
  setIncludeSpecialChars: (includeSpecialChars: boolean) => void;
  passwordLength: number;
  setPasswordLength: (passwordLength: number) => void;
}

export interface HistoryProps {
  passwordHistory: HistoryData;
  setPasswordHistory: React.Dispatch<React.SetStateAction<HistoryData>>;
  newPassword: () => void;
  copyToClipboard: (text: string) => void;
  displayCopy: () => void;
}

export interface PageNavProps {
  settingsPage: boolean;
  setSettingsPage: (settingsPage: boolean) => void;
}

export interface SettingsProps {
  settings: SettingState;
  setSettings: (settings: SettingState) => void;
}

export interface TextInputProps {
  type: string;
  label: string;
  value: string;
  onUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: (event: React.MouseEvent<SVGSVGElement>) => void;
  showReset?: boolean;
}

export interface VerificationBarProps {
  isCopied: boolean;
}

export interface DropdownProps {
  options: Language[];
  selected: string;
  onChange: (newLanguage: Language) => void;
}

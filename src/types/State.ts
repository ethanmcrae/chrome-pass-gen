import { Language } from './Language';

export interface SettingState {
  symbols: string;
  language: Language;
}

export interface GenerateSettingState {
  includeSpecialChars: boolean;
  passwordLength: number;
}
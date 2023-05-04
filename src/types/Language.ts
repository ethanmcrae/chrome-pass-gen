export enum Language {
  English = 'English',
  汉语 = '汉语',
  Español = 'Español',
  हिन्दी = 'हिन्दी',
  العربية = 'العربية',
  Português = 'Português',
  বাংলা = 'বাংলা',
  Русский = 'Русский',
  日本語 = '日本語',
  'Bahasa Indonesia' = 'Bahasa Indonesia',
}

export type Translations = {
  [language in Language]: {
    generateAgain: string;
    passwordCopied: string;
    length: string;
    symbols: string;
    history: string;
    save: string;
    settings: string;
    show: string;
    hide: string;
  };
}
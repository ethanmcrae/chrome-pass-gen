export interface HistoryData {
  [key: string]: PasswordData; // url: { ... }
}

export interface PasswordData {
  password: string;
  time: number;
}
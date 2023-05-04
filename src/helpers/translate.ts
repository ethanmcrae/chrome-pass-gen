import { Translations, Language } from "../types";

export const translations: Translations = {
  English: {
    generateAgain: "Generate Again",
    passwordCopied: "Password Copied",
    length: "Length",
    symbols: "Symbols",
    history: "History",
    save: "Save",
    settings: "Settings",
    show: "Show",
    hide: "Hide",
  },
  汉语: {
    generateAgain: "再次生成",
    passwordCopied: "密码已复制",
    length: "长度",
    symbols: "符号",
    history: "历史记录",
    save: "保存",
    settings: "设置",
    show: "显示",
    hide: "隐藏",
  },
  Español: {
    generateAgain: "Generar de nuevo",
    passwordCopied: "Contraseña copiada",
    length: "Longitud",
    symbols: "Símbolos",
    history: "Historial",
    save: "Guardar",
    settings: "Configuración",
    show: "Mostrar",
    hide: "Ocultar",
  },
  हिन्दी: {
    generateAgain: "फिर से उत्पन्न करें",
    passwordCopied: "पासवर्ड कॉपी किया गया",
    length: "लंबाई",
    symbols: "प्रतीक",
    history: "इतिहास",
    save: "सहेजें",
    settings: "सेटिंग्स",
    show: "दिखाएं",
    hide: "छिपाएं",
  },
  العربية: {
    generateAgain: "أعد التوليد",
    passwordCopied: "تم نسخ كلمة المرور",
    length: "الطول",
    symbols: "رموز",
    history: "السجل",
    save: "حفظ",
    settings: "الإعدادات",
    show: "إظهار",
    hide: "إخفاء",
  },
  Português: {
    generateAgain: "Gerar novamente",
    passwordCopied: "Senha copiada",
    length: "Comprimento",
    symbols: "Símbolos",
    history: "Histórico",
    save: "Salvar",
    settings: "Configurações",
    show: "Mostrar",
    hide: "Esconder",
  },
  বাংলা: {
    generateAgain: "আবার উত্পন্ন করুন",
    passwordCopied: "পাসওয়ার্ড কপি হয়েছে",
    length: "দৈর্ঘ্য",
    symbols: "প্রতীকগুলি",
    history: "ইতিহাস",
    save: "সংরক্ষণ করুন",
    settings: "সেটিংস",
    show: "দেখান",
    hide: "আড়ান",
  },
  Русский: {
    generateAgain: "Сгенерировать снова",
    passwordCopied: "Пароль скопирован",
    length: "Длина",
    symbols: "Символы",
    history: "История",
    save: "Сохранить",
    settings: "Настройки",
    show: "Показать",
    hide: "Скрыть",
  },
  日本語: {
    generateAgain: "再生成",
    passwordCopied: "パスワードがコピーされました",
    length: "長さ",
    symbols: "記号",
    history: "履歴",
    save: "保存",
    settings: "設定",
    show: "表示",
    hide: "非表示",
  },
  "Bahasa Indonesia": {
    generateAgain: "Hasilkan lagi",
    passwordCopied: "Kata sandi disalin",
    length: "Panjang",
    symbols: "Simbol",
    history: "Riwayat",
    save: "Simpan",
    settings: "Pengaturan",
    show: "Tampilkan",
    hide: "Sembunyikan",
  },
};

export function translate(
  language: Language,
  key: keyof Translations["English"]
): string {
  return translations[language]?.[key] || translations[Language.English][key];
}

/*
English: English
Chinese (Mandarin): 汉语
Spanish: Español
Hindi: हिन्दी
Arabic: العربية
Portuguese: Português
Bengali: বাংলা
Russian: Русский
Japanese: 日本語
Indonesian: Bahasa Indonesia
*/

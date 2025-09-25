import en from './translations/en.json';
import zh from './translations/zh.json';

export const languages = {
  en: 'English',
  zh: '中文',
};

export const defaultLang = 'en';

export const translations = {
  en,
  zh,
};

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations[defaultLang];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({
    params: { lang },
  }));
}

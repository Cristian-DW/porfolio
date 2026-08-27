import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES from './locales/es.json';
import translationEN from './locales/en.json';

const resources = {
  es: {
    translation: translationES
  },
  en: {
    translation: translationEN
  }
};

// English is the default language. A visitor's explicit choice
// (persisted by the LanguageSelector) always wins over the default.
const storedLanguage = (() => {
  try {
    return localStorage.getItem('portfolio-language');
  } catch {
    return null;
  }
})();

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage === 'es' || storedLanguage === 'en' ? storedLanguage : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

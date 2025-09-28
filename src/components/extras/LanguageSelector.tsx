import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('portfolio-language', lng);
  };

  return (
    <div className=" 2xl:left-10 flex flex-row gap-3 rounded-l-lg pt-2">
      <button
        className={`w-6 h-6 2xl:w-8 2xl:h-8 rounded-full border-2 ${
          i18n.language === 'es' ? 'border-white' : 'border-white/20'
        } hover:border-white/60 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 flex items-center justify-center font-bold text-white`}
        onClick={() => changeLanguage('es')}
        title={t('language.es')}
        aria-label={t('language.es')}
      >
        ES
      </button>
      <button
        className={`w-6 h-6 2xl:w-8 2xl:h-8 rounded-full border-2 ${
          i18n.language === 'en' ? 'border-white' : 'border-white/20'
        } hover:border-white/60 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 flex items-center justify-center font-bold text-white`}
        onClick={() => changeLanguage('en')}
        title={t('language.en')}
        aria-label={t('language.en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
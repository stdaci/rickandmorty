import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { setLanguage } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('mk')}>Macedonian</button>
    </div>
  );
};

export default LanguageSwitcher;
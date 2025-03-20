import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      status: 'Status',
      alive: 'Alive',
      dead: 'Dead',
      unknown: 'Unknown',
      species: 'Species',
      gender: 'Gender',
      origin: 'Origin',
    },
  },
  mk: {
    translation: {
      status: 'Статус',
      alive: 'Жив',
      dead: 'Мртов',
      unknown: 'Непознат',
      species: 'Вид',
      gender: 'Пол',
      origin: 'Потекло',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
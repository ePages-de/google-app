import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../src/locales/en.json';

function initializeEnglishLocale() {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',

      resources: { en: { translation: translationEN } },
    });
}

export { initializeEnglishLocale };

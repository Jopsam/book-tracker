import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLanding from './locales/en/landing.json';
import esLanding from './locales/es/landing.json';
import enDashboard from './locales/en/dashboard.json';
import esDashboard from './locales/es/dashboard.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        landing: enLanding,
        dashboard: enDashboard
      },
      es: {
        landing: esLanding,
        dashboard: esDashboard
      }
    },
    fallbackLng: 'en',
    defaultNS: 'landing',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;

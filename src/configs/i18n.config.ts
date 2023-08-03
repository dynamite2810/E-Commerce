import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from '../languages/en.json';
import translationVI from '../languages/vi.json';

const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;


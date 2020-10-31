import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",

    backend: {
      loadPath: "/locales/{{lng}}.json",
      // path to post missing resources
      addPath: "/locales/add/{{lng}}.json",
    },

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

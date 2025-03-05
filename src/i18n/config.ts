import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import * as en from './en/en.json';
import * as ru from './ru/ru.json';
import * as az from './az/az.json';


i18n

    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {translation: en},
            ru: {translation: ru},
            az: {translation: az}
        }
    }).then(() => console.log("i18n initialized"));


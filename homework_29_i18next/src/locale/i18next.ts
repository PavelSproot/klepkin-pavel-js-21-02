import i18next from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import FOOTER_EN from './en/footer';
import FOOTER_RU from './ru/footer';
import HEADER_RU from './ru/header';
import HEADER_EN from './en/header';
import LOGINFORM_EN from './en/login';
import LOGINFORM_RU from './ru/login';
import REGISTRATIONFORM_EN from './en/registration';
import REGISTRATIONFORM_RU from './ru/registration';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    debug: true,
    //    fallbackNS: 'footer',
    fallbackLng: 'ru',
    interpolation: {
      format: (value, format) => {
        if (value instanceof Date) {
          return moment(value).format(format);
        }
        return value;
      },
    },
    resources: {
      en: {
        footer: FOOTER_EN,
        header: HEADER_EN,
        loginform: LOGINFORM_EN,
        registrationform: REGISTRATIONFORM_EN,
      },
      ru: {
        footer: FOOTER_RU,
        header: HEADER_RU,
        loginform: LOGINFORM_RU,
        registrationform: REGISTRATIONFORM_RU,
      },
    },
  })
  .catch((err) => console.log(err));

moment.locale(i18next.language);

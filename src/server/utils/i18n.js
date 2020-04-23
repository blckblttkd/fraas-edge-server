import i18n from 'i18next';
import retrieveLanguageFile from '../helpers/retrieveLanguageFile';

export default async (translation) => {
   const resources = {
      en: {
         translation: translation
      }
   };

   i18n
      .init({
         resources,
         lng: 'en',

         keySeparator: false,

         interpolation: {
            escapeValue: false
         }
      });
};

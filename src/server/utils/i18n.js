import i18n from 'i18next';
import retrieveLanguageFile from '../helpers/retrieveLanguageFile';

export default async () => {
   const resources = {
      en: {
         translation: await retrieveLanguageFile('en', false)
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

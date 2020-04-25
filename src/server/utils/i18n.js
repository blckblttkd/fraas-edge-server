import i18n from 'i18next';

export default (translation) => {
   const resources = {
      en: {
         translation
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

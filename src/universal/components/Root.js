import React, { useEffect, StrictMode } from 'react';
import { useTranslation } from 'react-i18next';

const Root = () => {
   const { t, i18n } = useTranslation();

   useEffect(() => {
      i18n.on('languageChanged', () => {
         document.title = t('Application.Name');
      });
   }, [i18n, t]);

   return (
      <StrictMode>
         <div>{t('Test', { companyName: 'ForensecGlobal' })}</div>
      </StrictMode>
   );
};

export default Root;

import { renderToString } from 'react-dom/server';
import React from 'react';
import serialize from 'serialize-javascript';
import retrieveLanguageFile from '../helpers/retrieveLanguageFile';
import Root from '../../universal/components/Root';
import i18nInit from '../utils/i18n';

export default async function main(req, res) {
   try {
      const locale = 'en';
      const rawLanguage = retrieveLanguageFile(req, locale);
      await i18nInit(rawLanguage);

      const language = serialize(rawLanguage, { isJSON: true });

      const body = renderToString(<Root/>);

      res.render('main', {
         body,
         language,
         lang: locale,
         title: rawLanguage['Application.Name'],
         layout: false
      });
   } catch (error) {
      req.log.error({
         logId: 'ab524516-5011-460c-9fa8-a0123d55983c',
         message: 'Unable to render main entry point',
         error
      });
      res.boom.internal('Internal server error');
   }
}

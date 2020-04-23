import { renderToString } from 'react-dom/server';
import React from 'react';
import serialize from 'serialize-javascript';
import retrieveLanguageFile from '../helpers/retrieveLanguageFile';
import Root from '../../universal/components/Root';
import i18nInit from '../utils/i18n';

export default async function main(req, res) {
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
}

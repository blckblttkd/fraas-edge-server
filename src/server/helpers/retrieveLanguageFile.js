import path from 'path';
import fs from 'fs';
import serialize from 'serialize-javascript';
import createLogger from '../utils/logger';

const log = createLogger('retrieveDefaultLanguage');

/**
 *
 * @param {string} locale
 * @returns {string|{}}
 */
export default function retrieveLanguageFile(locale) {
   const enPath = path.resolve(process.cwd(), 'translations', `${locale}.json`);

   try {
      if (fs.existsSync(enPath)) {
         return JSON.parse(fs.readFileSync(enPath, { flag: 'r' }));
      }

      log.error({
         logId: '014c9d67-f036-4d4a-8502-669b0da37c7e',
         message: `Default language file does not exist at "${enPath}"`,
      });
      return {};
   } catch (error) {
      log.error({
         logId: 'a8c84309-05d3-4408-b986-944d2db6578b',
         message: `Failed to read default language file from "${enPath}"`,
         error
      });
      return {};
   }
}

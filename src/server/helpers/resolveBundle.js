import path from 'path';
import fs from 'fs';

/**
 * @typedef Logger
 * @property {function} info
 * @property {function} warn
 * @property {function} debug
 * @property {function} trace
 */
/**
 * @description Used by handlebars to determine the path to the static assets in the manifest.
 * @public
 * @function
 * @param {Logger} logger The logger instance for the given request.
 * @returns {function(...[*]=)}
 */
export default function resolveBundle(logger) {
   /**
    * @description Looks up the bundle from the published manifest.
    * @public
    * @function
    * @param {string} bundleName
    * @returns {string}
    */
   return (bundleName) => {
      const manifestPath = path.resolve(
         process.cwd(),
         'build',
         'public',
         'manifest.json'
      );

      let manifest;
      try {
         if (fs.existsSync(manifestPath)) {
            // eslint-disable-next-line import/no-dynamic-require
            manifest = require(manifestPath);
            return `/public/${manifest[bundleName]}`;
         }

         return `/public/${bundleName}`;
      } catch (error) {
         logger.error({
            logId: 'e3cbb634-0db8-4f03-a708-29f2f75a5137',
            message: 'Failed to find manifest file for bundle resolution.',
            error
         });

         throw error;
      }
   };
}

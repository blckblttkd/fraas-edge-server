import path from 'path';
import fs from 'fs';

export default function resolveBundle(logger) {
   return function(bundleName) {
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

import path from 'path';
import fs from 'fs';
import createLogger from '../utils/logger';

const log = createLogger('resolveBundle');

export default function resolveBundle(bundleName) {
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
         return `/assets/${manifest[bundleName]}`;
      }

      return `/assets/${bundleName}`;
   } catch (error) {
      log.error({
         logId: 'e3cbb634-0db8-4f03-a708-29f2f75a5137',
         message: 'Failed to find manifest file for bundle resolution.',
         error
      });

      throw error;
   }
}

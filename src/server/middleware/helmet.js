import helmet from 'helmet';
import { isDeployed } from '../utils/environmentResolver';

/**
 *
 * @param {Object} app Express application object
 * @param {Array<string>} cspList The array list of items used for defining the CSP header
 * be skipped for CSRF protection.
 */
export default function (app, { defaultSrc, scriptSrc, objectSrc }) {
   if (isDeployed) {
      app.use(
         helmet({
            contentSecurityPolicy: {
               directives: {
                  defaultSrc,
                  scriptSrc,
                  objectSrc
               }
            },
            hidePoweredBy: { setTo: 'PHP 7.2.0' } // lol.  Poor hacker.  Good luck!
         })
      );
   }
}

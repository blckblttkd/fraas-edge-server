import helmet from 'helmet';
import { isDeployed } from '../utils/environmentResolver';

/**
 * @description Applies CSP header parameters
 * @public
 * @function
 * @module middleware
 * @param {Object} app Express application object
 * @param {Array<string>} cspList The array list of items used for defining the CSP header
 * be skipped for CSRF protection.
 */
export default function (app, { defaultSrc, scriptSrc }) {
   if (isDeployed()) {
      app.use(
         helmet({
            contentSecurityPolicy: {
               directives: {
                  defaultSrc,
                  scriptSrc
               }
            },
            hidePoweredBy: { setTo: 'PHP 7.2.0' } // lol.  Poor hacker.  Good luck!
         })
      );
   }
}

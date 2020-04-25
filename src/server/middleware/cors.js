import cors from 'cors';

/**
 * @description Applies cors security headers.
 * @public
 * @function
 * @module middleware
 * @param {Object} app Express application object
 * @param {string} corsOrigins String list of origins to be used for CORS
 * be skipped for CSRF protection.
 */
export default function (app, corsOrigins) {
   app.use(
      cors({
         origin: corsOrigins,
         optionsSuccessStatus: 200
      })
   );
}

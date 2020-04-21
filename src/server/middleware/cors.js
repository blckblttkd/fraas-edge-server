import cors from 'cors';

/**
 *
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

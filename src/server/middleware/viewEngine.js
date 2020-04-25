import handlebarsEngine from 'express-handlebars';
import resolveBundle from '../helpers/resolveBundle';

/**
 * @module middleware
 */

/**
 * @description Registers a new view engine with express.
 * @public
 * @function
 * @module middleware
 * @param {Object} app Express application object
 * @param {module:utils.Logger} logger
 * @param {string} viewsDir The path to the custom views directory
 */
export default function registerViewEngine(app, logger, viewsDir) {
   const extname = '.hbs';
   app.engine(
      extname,
      handlebarsEngine({ extname, helpers: { resolveBundle: resolveBundle(logger) } })
   );
   app.set('view engine', extname);
   app.set('views', viewsDir);
}

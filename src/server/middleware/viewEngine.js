import handlebarsEngine from 'express-handlebars';
import resolveBundle from '../helpers/resolveBundle';

/**
 *
 * @param {Object} app Express application object
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

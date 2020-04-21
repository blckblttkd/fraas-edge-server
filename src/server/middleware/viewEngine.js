import handlebarsEngine from 'express-handlebars';
import resolveBundle from '../helpers/resolveBundle';

/**
 *
 * @param {Object} app Express application object
 * @param {string} viewsDir The path to the custom views directory
 */
export default function registerViewEngine(app, viewsDir) {
   const extname = '.hbs';
   app.engine(
      extname,
      handlebarsEngine({ extname, helpers: { resolveBundle } })
   );
   app.set('view engine', extname);
   app.set('views', viewsDir);
}

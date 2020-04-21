import createLogger from '../utils/logger';

const log = createLogger('CSRF middleware');

// Performs CSRF check using the double submit method.  It compares the token in the jwt,
// with the token in the header.  If they are equal, we're good.  If not, we have a hijack attempt.
const csrf = (options) => (req, res, next) => {
   const {
      ignoredMethods = ['GET', 'OPTIONS', 'HEAD'],
      ignoredMutations = []
   } = options;

   if (ignoredMethods.includes(req.method)) {
      log.trace(`Ignoring ${req.method} request`);
      next();
      return;
   }

   const spaceIndex = req.body.query.indexOf(' ');
   const operationType = req.body.query.substr(0, spaceIndex);
   const operationName = req.body.query.substr(
      spaceIndex + 1,
      req.body.query.indexOf('(') - spaceIndex - 1
   );

   if (operationType === 'query') {
      log.trace('Ignoring queries.');
      next();
      return;
   }

   if (ignoredMutations.includes(operationName)) {
      log.trace(`Ignored mutation ${operationName}`);
      next();
      return;
   }

   const headerValue = req.header('X-CSRF-Token');
   const tokenValue = req.token.csrfToken;

   if (headerValue !== tokenValue) {
      log.error('CSRF token verification failed.  Two values are not equal.');
      res.status(403).json({
         status: 403,
         message: 'FORBIDDEN'
      });
      return;
   }

   next();
};

/**
 *
 * @param {Object} app Express application object
 * @param {string} route The route describing where to attach the middleware
 * @param {Array<string>} ignoredMutations List of mutations that should
 * be skipped for CSRF protection.
 */
export default (app, route, ignoredMutations) => {
   app.use(
      route,
      csrf({
         ignoredMutations
      })
   );
};

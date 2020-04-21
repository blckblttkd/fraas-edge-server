import express from 'express';
import compression from 'compression';
import { bodyParserGraphQL } from 'body-parser-graphql';
import path from 'path';
import helmet from './helmet';
import csrf from './csrf';
import routes from '../routes';
import registerViewEngine from './viewEngine';
import createLogger from '../utils/logger';

/**
 * @typedef CSPOptions
 * @property {Array<string>} defaultSrc
 * @property {Array<string>} scriptSrc
 * @property {Array<string>} objectSrc
 */

/**
 * @typedef MiddlewareOptions
 * @property {string} graphQLRoute
 * @property {Array<string>} ignoredMutations
 * @property {CSPOptions} contentSecurityPolicy
 * @property {string} publicDir
 * @property {string} corsOrigins
 * @property {string} viewsDir
 */

const log = createLogger('middleware');

/**
 *
 * @param {Object} app
 * @param {MiddlewareOptions} options
 */
export default function attach(app, options) {
   log.trace('Configuring template engine.');
   registerViewEngine(app, options.viewsDir);

   log.trace('Adding security measures');
   csrf(app, options.graphQLRoute, options.ignoredMutations);
   helmet(app, options.contentSecurityPolicy);

   log.trace('Adding automatic response compression');
   app.use(compression());

   log.trace('Configuring graphql body parser');
   app.use(options.graphQLRoute, bodyParserGraphQL());

   log.trace('Adding routes');
   const publicPath = path.join(process.cwd(), 'build', options.publicDir);
   app.use('/assets', express.static(publicPath));
   app.use(routes);
}

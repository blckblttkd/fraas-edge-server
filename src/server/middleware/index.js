import express from 'express';
import compression from 'compression';
import { bodyParserGraphQL } from 'body-parser-graphql';
import path from 'path';
import addRequestId from 'express-request-id';
import boom from 'express-boom';
import helmet from './helmet';
import csrf from './csrf';
import routes from '../routes';
import registerViewEngine from './viewEngine';
import loggerMiddleware from './logger';

/**
 * @module middleware
 */

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
 * @property {string} assetsDir
 */

/**
 * @description Assembles all the middleware onto the app object.
 * @param {Object} app
 * @param {module:utils.Logger} logger
 * @param {MiddlewareOptions} options
 */
export default function attach(app, logger, options) {
   app.use(addRequestId());
   app.use(boom());

   logger.trace('Adding request logger');
   app.use(loggerMiddleware);

   logger.trace('Configuring template engine.');
   registerViewEngine(app, logger, options.viewsDir);

   logger.trace('Adding security measures');
   csrf(app, options.graphQLRoute, options.ignoredMutations);
   helmet(app, options.contentSecurityPolicy);

   logger.trace('Adding automatic response compression');
   app.use(compression());

   logger.trace('Configuring graphql body parser');
   app.use(options.graphQLRoute, bodyParserGraphQL());

   logger.trace('Adding routes');
   const publicPath = path.join(process.cwd(), 'build', options.publicDir);
   const assetsPath = path.join(process.cwd(), 'build', options.assetsDir);
   app.use('/public', express.static(publicPath));
   app.use('/assets', express.static(assetsPath));
   app.use(routes);
}

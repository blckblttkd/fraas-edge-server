import createLogger from '../utils/logger';

/**
 * @description Custom middleware that adds a log function on the request.  The argument
 * to createLogger is the bunyan widget_type.  This is used a trace marker
 * to correlate log messages to the request that generated them.
 * @public
 * @function
 * @module middleware
 * @param {import('express/lib/request')} req
 * @param {import('express/lib/response')} res
 * @param {function} next
 */
export default function requestLogger(req, res, next) {
   req.log = createLogger(req.id);
   next();
}

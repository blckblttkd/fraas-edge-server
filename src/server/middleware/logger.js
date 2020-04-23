import createLogger from '../utils/logger';

/**
 * Custom middleware that adds a log function on the request.  The argument
 * to createLogger is the bunyan widget_type.  This is used a trace marker
 * to correlate log messages to the request that generated them.
 * @param req
 * @param res
 * @param next
 */
export default function requestLogger(req, res, next) {
   req.log = createLogger(req.id);
   next();
}

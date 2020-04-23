import Logger from 'bunyan';
import { name } from '../../../package.json';

/**
 *
 * @typedef Logger
 * @property {function} info
 * @property {function} trace
 * @property {function} debug
 * @property {function} error
 * @property {function} warn
 */

const internalLogger = new Logger({
   name,
   levelInString: true,
   streams: [
      {
         stream: process.stdout,
         level: process.env.NODE_ENV === 'production' ? 'info' : 'trace'
      }
   ]
});

/**
 *
 * @param {string} tracer
 * @returns Logger
 */
export default function (tracer) {
   // intercepts all log messages and prepends a trace marker
   // to every message.  If no tracer exists, it will write
   // the log message as supplied.
   const handler = {
      get(target, propKey) {
         const origMethod = target[propKey];
         return (...args) => {
            if (tracer) {
               if (typeof args[0] === 'object') {
                  origMethod.call(target, {
                     tracer,
                     ...args[0]
                  });
               } else {
                  origMethod.apply(target, [{ tracer }, ...args]);
               }
            } else {
               origMethod.apply(target, args);
            }
         };
      }
   };

   return new Proxy(internalLogger.child(null, false), handler);
}

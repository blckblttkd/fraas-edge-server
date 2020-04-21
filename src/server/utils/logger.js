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
   streams: [
      {
         stream: process.stdout,
         level: process.env.NODE_ENV === 'production' ? 'info' : 'trace'
      }
   ]
});

/**
 *
 * @param {string} widgetType
 * @returns Logger
 */
export default function (widgetType) {
   return internalLogger.child({ widget_type: widgetType }, false);
}

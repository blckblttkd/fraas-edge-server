"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bunyan = _interopRequireDefault(require("bunyan"));

var _package = require("../../../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const internalLogger = new _bunyan.default({
  name: _package.name,
  streams: [{
    stream: process.stdout,
    level: process.env.NODE_ENV === 'production' ? 'info' : 'trace'
  }]
});
/**
 *
 * @typedef Logger
 * @property {function} info
 * @property {function} trace
 * @property {function} debug
 * @property {function} error
 * @property {function} warn
 */

/**
 *
 * @param {string} widgetType
 * @returns Logger
 */

function _default(widgetType) {
  return internalLogger.child({
    widget_type: widgetType
  }, false);
}
//# sourceMappingURL=logger.js.map
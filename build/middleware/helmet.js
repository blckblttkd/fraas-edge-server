"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _helmet = _interopRequireDefault(require("helmet"));

var _environmentResolver = require("../utils/environmentResolver");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Object} app Express application object
 * @param {Array<string>} cspList The array list of items used for defining the CSP header
 * be skipped for CSRF protection.
 */
function _default(app, cspList) {
  if (_environmentResolver.isDeployed) {
    app.use((0, _helmet.default)({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: cspList
        }
      },
      hidePoweredBy: {
        setTo: 'PHP 7.2.0'
      } // lol.  Poor hacker.  Good luck!

    }));
  }
}
//# sourceMappingURL=helmet.js.map
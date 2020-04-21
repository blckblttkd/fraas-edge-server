"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Object} app Express application object
 * @param {string} corsOrigins String list of origins to be used for CORS
 * be skipped for CSRF protection.
 */
function _default(app, corsOrigins) {
  app.use((0, _cors.default)({
    origin: corsOrigins,
    optionsSuccessStatus: 200
  }));
}
//# sourceMappingURL=cors.js.map
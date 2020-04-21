"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attach;

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _bodyParserGraphql = require("body-parser-graphql");

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("./helmet"));

var _csrf = _interopRequireDefault(require("./csrf"));

var _routes = _interopRequireDefault(require("../routes"));

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef MiddlewareOptions
 * @property {string} graphQLRoute
 * @property {Array<string>} ignoredMutations
 * @property {Array<string>} contentSecurityPolicy
 * @property {string} publicDir
 * @property {string} corsOrigins
 * @property {string} viewsDir
 */

/**
 *
 * @param {Object} app
 * @param {MiddlewareOptions} options
 */
const log = (0, _logger.default)('middleware');

function attach(app, options) {
  log.trace('Configuring template engine.');
  const extname = '.hbs';
  app.engine(extname, (0, _expressHandlebars.default)({
    extname
  }));
  app.set('view engine', extname);
  app.set('views', options.viewsDir);
  log.trace('Adding security measures');
  (0, _csrf.default)(app, options.graphQLRoute, options.ignoredMutations);
  (0, _helmet.default)(app, options.contentSecurityPolicy);
  log.trace('Adding automatic response compression');
  app.use((0, _compression.default)());
  log.trace('Configuring graphql body parser');
  app.use(options.graphQLRoute, (0, _bodyParserGraphql.bodyParserGraphQL)());
  log.trace('Adding routes');
  app.use(_express.default.static(_path.default.join(__dirname, options.publicDir)));
  app.use(_routes.default);
}
//# sourceMappingURL=index.js.map
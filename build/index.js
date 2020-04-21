"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./schema"));

var _healthChecker = _interopRequireDefault(require("./utils/healthChecker"));

var _logger = _interopRequireDefault(require("./utils/logger"));

var _environmentResolver = require("./utils/environmentResolver");

var _middleware = _interopRequireDefault(require("./middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const app = (0, _express.default)(); // Setup logger for this startup sequence

const log = (0, _logger.default)('Server');
(0, _middleware.default)(app, {
  graphQLRoute: '/graphql',
  ignoredMutations: [],
  contentSecurityPolicy: ["'self'"],
  corsOrigins: '*',
  publicDir: 'public',
  viewsDir: './src/server/views'
}); // Build out the GraphQL server

const server = new _apolloServerExpress.ApolloServer({ ...(0, _schema.default)(),
  debug: !_environmentResolver.isDeployed,
  playground: !_environmentResolver.isDeployed,
  tracing: !_environmentResolver.isProduction
}); // Register GraphQL middleware

server.applyMiddleware({
  app,
  onHealthCheck: async () => {
    log.info('health check.');
    return (0, _healthChecker.default)();
  }
});
const port = process.env.NODE_PORT;
app.listen({
  port
}, () => {
  log.info(`🚀 Server ready at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
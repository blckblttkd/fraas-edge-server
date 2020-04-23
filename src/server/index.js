import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import buildSchema from './schema';
import healthCheck from './utils/healthChecker';
import createLogger from './utils/logger';
import { isDeployed, isProduction } from './utils/environmentResolver';
import attachMiddleware from './middleware';

require('dotenv').config();

const app = express();

// Setup logger for this startup sequence
const log = createLogger('Server');

const cspSelf = ["'self'"];
attachMiddleware(app, log,{
   graphQLRoute: '/graphql',
   ignoredMutations: [],
   contentSecurityPolicy: {
      defaultSrc: cspSelf,
      scriptSrc: [...cspSelf, "'unsafe-inline'"]
   },
   corsOrigins: '*',
   publicDir: 'public',
   assetsDir: 'assets',
   viewsDir: './src/server/views'
});

// Build out the GraphQL server
const server = new ApolloServer({
   ...buildSchema(),
   debug: !isDeployed,
   playground: !isDeployed,
   tracing: !isProduction
});

// Register GraphQL middleware
server.applyMiddleware({
   app,
   onHealthCheck: async () => {
      log.info({
         logId: '4599b611-f027-48ec-9598-17c8c4fc67be',
         message: 'health check.'
      });
      return healthCheck();
   }
});

const port = process.env.NODE_PORT;
app.listen({ port }, () => {
   log.info({
      logId: 'b3975d35-78b1-43b2-a1fe-531c9117c76f',
      message: `🚀 Server ready at http://localhost:${port}`
   });
});

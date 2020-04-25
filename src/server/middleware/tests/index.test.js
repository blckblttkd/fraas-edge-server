import index from '..';

jest.mock('express', () => ({
   Router: jest.fn().mockImplementation(() => ({
      get: jest.fn()
   })),
   static: jest.fn()
}));

jest.mock('compression');
jest.mock('body-parser-graphql', () => ({
   bodyParserGraphQL: jest.fn()
}));
jest.mock('express-request-id');
jest.mock('../helmet');
jest.mock('../csrf');
jest.mock('../../routes');
jest.mock('../viewEngine');
jest.mock('../logger');
jest.mock('path', () => ({
   join: jest.fn().mockImplementation(() => 'some path')
}));

describe('server/middleware/index.js', () => {
   test('index registers all the middleware successfully - code coverage', () => {
      const app = {
         use: jest.fn()
      };

      const logger = {
         trace: jest.fn()
      };

      expect(() => index(app, logger, {})).not.toThrow();
   });
});

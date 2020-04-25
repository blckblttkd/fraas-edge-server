import createLogger from '../../utils/logger';
import loggerMiddleware from '../logger';

jest.mock('../../utils/logger');

describe('server/middleware/logger.js', () => {
   test('creates a new request level logger and calls next', () => {
      const req = {
         id: 'myId'
      };

      createLogger.mockImplementation(() => ({
         trace: jest.fn(),
         info: jest.fn()
      }));
      const next = jest.fn();

      loggerMiddleware(req, null, next);

      expect(req.log).toHaveProperty('trace');
      expect(req.log).toHaveProperty('info');
      expect(createLogger).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
   });
});

import helmet from 'helmet';
import helmetMiddleware from '../helmet';
import { isDeployed } from '../../utils/environmentResolver';

jest.mock('helmet');
jest.mock('../../utils/environmentResolver');

describe('server/middleware/helmet.js', () => {
   beforeEach(() => {
      jest.resetAllMocks();
   });

   test('calls helmet successfully', () => {
      const app = {
         use: jest.fn()
      };

      const config = {
         defaultSrc: 'default',
         scriptSrc: 'script'
      };

      isDeployed.mockImplementation(() => true);

      expect(() => helmetMiddleware(app, config)).not.toThrow();
      expect(app.use).toHaveBeenCalledTimes(1);
      expect(helmet).toHaveBeenCalledTimes(1);
   });

   test('skips calling helment for local env', () => {
      process.env.NODE_ENV = 'local';

      const app = {
         use: jest.fn()
      };

      isDeployed.mockImplementation(() => false);

      expect(() => helmetMiddleware(app, {})).not.toThrow();
      expect(app.use).not.toHaveBeenCalled();
   });
});

import cors from 'cors';
import corsMiddleware from '../cors';

jest.mock('cors');

describe('server/middleware/cors.js', () => {
   test('calls cors successfully', () => {
      const app = {
         use: jest.fn()
      };

      expect(() => corsMiddleware(app, 'localhost')).not.toThrow();
      expect(app.use).toHaveBeenCalledTimes(1);
      expect(cors).toHaveBeenCalledTimes(1);
      expect(cors.mock.calls[0][0].origin).toEqual('localhost');
   });
});
